import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import TaylorChat from '@/components/TaylorChat';
import { Shield, User as UserIcon } from 'lucide-react';
import Header from '@/components/Header';
import logo from '@/assets/aetherium-logo.png';

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


  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Header />
        <div className="animate-pulse text-foreground pt-20">Загрузка профиля...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 pt-20">
        <div className="container mx-auto p-4 max-w-7xl">
          <div className="flex items-center gap-4 mb-6">
            <img src={logo} alt="Aetherium" className="w-16 h-16 object-contain" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Панель управления
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <UserIcon className="w-5 h-5 text-primary" />
                    Профиль
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Ваша учетная запись Aetherium
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Имя пользователя</p>
                    <p className="font-medium text-foreground">{user?.user_metadata?.username || profile?.username || 'Не указано'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-foreground">{user?.email}</p>
                  </div>
                  {roles.length > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                        <Shield className="w-4 h-4 text-primary" />
                        Роли
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {roles.map((role) => (
                          <Badge key={role} className="bg-primary/20 text-primary border-primary/30">
                            {roleTranslations[role] || role}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <TaylorChat />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
