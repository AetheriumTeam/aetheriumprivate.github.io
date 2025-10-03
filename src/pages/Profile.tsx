import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import TaylorChat from '@/components/TaylorChat';
import { LogOut, Shield, User as UserIcon } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<any>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

    const roleTranslations: Record<string, string> = {
        'admin': 'Администратор',
        'user': 'Пользователь',
        'moderator': 'Модератор'
    };

  useEffect(() => {
    if (user) {
      loadProfile();
      loadRoles();
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .maybeSingle();

      if (error) throw error;
      setProfile(data);
    } catch (error: any) {
      toast({
        title: 'Ошибка загрузки профиля',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const loadRoles = async () => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user?.id);

      if (error) throw error;
      setRoles(data?.map(r => r.role) || []);
    } catch (error: any) {
      console.error('Ошибка загрузки ролей:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: 'Выход выполнен',
        description: 'До скорой встречи!',
      });
    } catch (error: any) {
      toast({
        title: 'Ошибка выхода',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-foreground">Загрузка профиля...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="container mx-auto p-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <UserIcon className="w-5 h-5" />
                    Профиль
                  </CardTitle>
                  <Button variant="ghost" size="icon" onClick={handleSignOut}>
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
                <CardDescription>Ваша учетная запись Aetherium</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Имя пользователя</p>
                  <p className="font-medium">{user?.user_metadata?.username || profile?.username || 'Не указано'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{user?.email}</p>
                </div>
                {roles.length > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                      <Shield className="w-4 h-4" />
                      Роли
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {roles.map((role) => (
                      <Badge key={role} variant={role === 'admin' ? 'default' : 'secondary'}>
                          {roleTranslations[role] || role}
                      </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ссылки</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="/landing.html">Главная страница</a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="/privileges.html">Привилегии</a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="/rules.html">Правила</a>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <TaylorChat />
          </div>
        </div>
      </div>
    </div>
  );
}
