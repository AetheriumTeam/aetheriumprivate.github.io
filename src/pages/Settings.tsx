import { useEffect, useState } from 'react';
import { useLocale } from '@/context/locale';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase, isSupabaseConfigured } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const flags: Record<string, string> = { ru: '🇷🇺', en: '🇬🇧', fr: '🇫🇷', es: '🇪🇸' };

export default function Settings() {
  const { locale, setLocale, t } = useLocale();
  const { user } = useAuth();
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setUsername(user?.user_metadata?.username || '');
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <div className="container mx-auto max-w-3xl pt-8 space-y-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{t('settings.title')}</h1>

        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>{t('settings.language')}</CardTitle>
            <CardDescription>EN / RU / FR / ES</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(['ru','en','fr','es'] as const).map(l => (
              <Button key={l} variant={locale === l ? 'default' : 'outline'} onClick={() => setLocale(l)} className="justify-start">
                <span className="mr-2 text-lg">{flags[l]}</span>
                {l.toUpperCase()}
              </Button>
            ))}
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle>{t('settings.account')}</CardTitle>
            <CardDescription>Supabase</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">{t('settings.username')}</Label>
              <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} disabled={!isSupabaseConfigured || !user || saving} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="avatar">{t('settings.avatar')}</Label>
              <Input id="avatar" value={avatar} onChange={(e) => setAvatar(e.target.value)} placeholder="https://..." disabled={!isSupabaseConfigured || !user || saving} />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={async () => {
                  if (!isSupabaseConfigured || !supabase || !user) return;
                  setSaving(true);
                  try {
                    const { error } = await supabase.from('profiles').upsert({ id: user.id, username: username || null, avatar_url: avatar || null });
                    if (error) throw error;
                    await supabase.auth.updateUser({ data: { username: username || undefined } });
                    toast({ title: 'OK', description: 'Профиль обновлен' });
                  } catch (e: any) {
                    toast({ title: 'Ошибка', description: e.message, variant: 'destructive' });
                  } finally {
                    setSaving(false);
                  }
                }}
                disabled={!isSupabaseConfigured || !user || saving}
              >
                {t('settings.save')}
              </Button>
              <Button
                variant="outline"
                onClick={async () => {
                  if (!isSupabaseConfigured || !supabase) return;
                  await supabase.auth.signOut();
                  window.location.href = '/auth';
                }}
              >
                {t('settings.logout')}
              </Button>
              <Button
                variant="outline"
                onClick={() => { window.location.href = '/auth'; }}
              >
                {t('settings.switch')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
