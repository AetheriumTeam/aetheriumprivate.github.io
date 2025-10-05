import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, User as UserIcon } from 'lucide-react';

export default function Profile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<any>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editorUsername, setEditorUsername] = useState('');
  const [editorAvatarUrl, setEditorAvatarUrl] = useState('');

    const roleTranslations: Record<string, string> = {
        'admin': 'Администратор',
        'user': 'Пользователь',
        'moderator': 'Модератор'
    };

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;
    if (user) {
      loadProfile();
      loadRoles();
    }
  }, [user]);

  useEffect(() => {
    setEditorUsername(user?.user_metadata?.username || profile?.username || '');
    setEditorAvatarUrl(profile?.avatar_url || '');
  }, [user, profile]);

  const loadProfile = async () => {
    if (!isSupabaseConfigured || !supabase) { setLoading(false); return; }
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
    if (!isSupabaseConfigured || !supabase) return;
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
        <div className="animate-pulse text-foreground">Загрузка профиля...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <div className="container mx-auto max-w-4xl pt-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
          Управление аккаунтом
        </h1>

        {!isSupabaseConfigured ? (
          <Card className="border-destructive/40">
            <CardHeader>
              <CardTitle className="text-foreground">Профиль недоступен</CardTitle>
              <CardDescription className="text-muted-foreground">
                Не заданы переменные VITE_SUPABASE_URL и VITE_SUPABASE_PUBLISHABLE_KEY. Добавьте их, чтобы включить профиль и роли.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <>
            <Card className="border-primary/20 mb-6">
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

            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-foreground">Редактор профиля</CardTitle>
                <CardDescription className="text-muted-foreground">Обновите данные своего профиля</CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  className="space-y-4"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!isSupabaseConfigured || !supabase || !user) return;
                    setSaving(true);
                    try {
                      const { error } = await supabase
                        .from('profiles')
                        .upsert({ id: user.id, username: editorUsername || null, avatar_url: editorAvatarUrl || null });
                      if (error) throw error;
                      await supabase.auth.updateUser({ data: { username: editorUsername || undefined } });
                      toast({ title: 'Сохранено', description: 'Профиль обновлен' });
                      await loadProfile();
                    } catch (err: any) {
                      toast({ title: 'Ошибка', description: err.message, variant: 'destructive' });
                    } finally {
                      setSaving(false);
                    }
                  }}
                >
                  <div className="space-y-2">
                    <Label htmlFor="username">Имя пользователя</Label>
                    <Input
                      id="username"
                      value={editorUsername}
                      onChange={(e) => setEditorUsername(e.target.value)}
                      placeholder="username"
                      disabled={saving}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="avatar">Ссылка на аватар</Label>
                    <Input
                      id="avatar"
                      value={editorAvatarUrl}
                      onChange={(e) => setEditorAvatarUrl(e.target.value)}
                      placeholder="https://..."
                      disabled={saving}
                    />
                  </div>
                  <div className="pt-2">
                    <Button type="submit" disabled={saving}>Сохранить</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
