import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `${window.location.origin}/`,
                    data: {
                        username
                    }
                }
            });

            if (error) throw error;

            toast({
                title: 'Регистрация успешна!',
                description: 'Проверьте email для подтверждения аккаунта.',
            });
        } catch (error: any) {
            toast({
                title: 'Ошибка регистрации',
                description: error.message,
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            toast({
                title: 'Вход выполнен!',
                description: 'Добро пожаловать в Aetherium.',
            });
        } catch (error: any) {
            toast({
                title: 'Ошибка входа',
                description: error.message,
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20 flex items-center justify-center p-4">
            <Card className="w-full max-w-md animate-in fade-in-0 zoom-in-98 duration-700">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-in slide-in-from-top-2 duration-1000">
                        Aetherium
                    </CardTitle>
                    <CardDescription className="animate-in fade-in-0 slide-in-from-top-1 duration-1000 delay-150">
                        Войдите или зарегистрируйтесь
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="signin" className="w-full transition-all duration-500 ease-in-out">
                        <TabsList className="grid w-full grid-cols-2 p-1 bg-muted/50 backdrop-blur-sm">
                            <TabsTrigger
                                value="signin"
                                className="transition-all duration-500 data-[state=active]:bg-background data-[state=active]:shadow-lg data-[state=active]:scale-[1.02] rounded-md"
                            >
                                Вход
                            </TabsTrigger>
                            <TabsTrigger
                                value="signup"
                                className="transition-all duration-500 data-[state=active]:bg-background data-[state=active]:shadow-lg data-[state=active]:scale-[1.02] rounded-md"
                            >
                                Регистрация
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="signin" className="animate-in fade-in-0 slide-in-from-left-2 duration-700">
                            <form onSubmit={handleSignIn} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="signin-email">Email</Label>
                                    <Input
                                        id="signin-email"
                                        type="email"
                                        placeholder="your@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="transition-all duration-500 focus:scale-[1.01]"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="signin-password">Пароль</Label>
                                    <Input
                                        id="signin-password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="transition-all duration-500 focus:scale-[1.01]"
                                        required
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full transition-all duration-500 hover:scale-[1.01] active:scale-[0.98]"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span className="flex items-center gap-2">
                      <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Вход...
                    </span>
                                    ) : 'Войти'}
                                </Button>
                            </form>
                        </TabsContent>

                        <TabsContent value="signup" className="animate-in fade-in-0 slide-in-from-right-2 duration-700">
                            <form onSubmit={handleSignUp} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="signup-username">Имя пользователя</Label>
                                    <Input
                                        id="signup-username"
                                        type="text"
                                        placeholder="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="transition-all duration-500 focus:scale-[1.01]"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="signup-email">Email</Label>
                                    <Input
                                        id="signup-email"
                                        type="email"
                                        placeholder="your@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="transition-all duration-500 focus:scale-[1.01]"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="signup-password">Пароль</Label>
                                    <Input
                                        id="signup-password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="transition-all duration-500 focus:scale-[1.01]"
                                        required
                                        minLength={6}
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full transition-all duration-500 hover:scale-[1.01] active:scale-[0.98]"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span className="flex items-center gap-2">
                      <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Регистрация...
                    </span>
                                    ) : 'Зарегистрироваться'}
                                </Button>
                            </form>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}