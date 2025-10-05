import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Lazy load framer-motion
let motion = { div: (props: any) => <div {...props} /> };
let AnimatePresence = ({ children }: any) => <>{children}</>;
import('framer-motion').then((module) => {
    motion = module.motion;
    AnimatePresence = module.AnimatePresence;
});

export default function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('signin');
    const [isMounted, setIsMounted] = useState(false);
    const { toast } = useToast();

    // Ensure framer-motion is loaded before rendering animations
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isSupabaseConfigured || !supabase) {
            toast({ title: 'Supabase не настроен', description: 'Добавьте VITE_SUPABASE_URL и VITE_SUPABASE_PUBLISHABLE_KEY, затем перезапустите превью.', variant: 'destructive' });
            return;
        }
        setLoading(true);

        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `${window.location.origin}/`,
                    data: { username },
                },
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
        if (!isSupabaseConfigured || !supabase) {
            toast({ title: 'Supabase не настроен', description: 'Добавьте VITE_SUPABASE_URL и VITE_SUPABASE_PUBLISHABLE_KEY, затем перезапустите превью.', variant: 'destructive' });
            return;
        }
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

    // Compute initial tab indicator position
    const initialTabPosition = activeTab === 'signin' ? '4px' : 'calc(50% + 0px)';

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
            <Card className="w-full max-w-md animate-in fade-in-0 zoom-in-98 duration-500 overflow-hidden border-primary/20">
                <CardHeader className="text-center space-y-4">
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-in slide-in-from-top-2 duration-700">
                        Вход в систему
                    </CardTitle>
                    <CardDescription className="animate-in fade-in-0 slide-in-from-top-1 duration-700 delay-100 text-muted-foreground">
                        Войдите или зарегистрируйтесь
                    </CardDescription>
                    {!isSupabaseConfigured && (
                        <p className="text-sm text-destructive-foreground bg-destructive/20 border border-destructive/40 rounded-md p-2">
                            Функции входа отключены: не заданы VITE_SUPABASE_URL и VITE_SUPABASE_PUBLISHABLE_KEY.
                        </p>
                    )}
                </CardHeader>
                <CardContent className="p-4">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-2 p-1 bg-muted/50 backdrop-blur-sm relative">
                            {isMounted ? (
                                <motion.div
                                    className="absolute inset-y-1 w-[calc(50%-4px)] bg-background shadow-lg rounded-md"
                                    initial={{ left: initialTabPosition }}
                                    animate={{ left: activeTab === 'signin' ? '4px' : 'calc(50% + 0px)' }}
                                    transition={{ ease: 'easeOut', duration: 0.15 }}
                                />
                            ) : (
                                <div
                                    className="absolute inset-y-1 w-[calc(50%-4px)] bg-background shadow-lg rounded-md"
                                    style={{ left: initialTabPosition }}
                                />
                            )}
                            <TabsTrigger
                                value="signin"
                                className="relative z-10 transition-all duration-150 data-[state=active]:text-foreground text-muted-foreground"
                            >
                                Вход
                            </TabsTrigger>
                            <TabsTrigger
                                value="signup"
                                className="relative z-10 transition-all duration-150 data-[state=active]:text-foreground text-muted-foreground"
                            >
                                Регистрация
                            </TabsTrigger>
                        </TabsList>

                        <motion.div
                            className="relative mt-4 overflow-hidden px-2"
                            animate={{
                                height: activeTab === 'signin' ? 240 : 320,
                            }}
                            transition={{
                                ease: 'easeOut',
                                duration: 0.15,
                            }}
                        >
                            {isMounted && (
                                <AnimatePresence mode="popLayout" initial={false}>
                                    {activeTab === 'signin' ? (
                                        <motion.div
                                            key="signin"
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            transition={{
                                                ease: 'easeOut',
                                                duration: 0.15,
                                            }}
                                        >
                                            <form onSubmit={handleSignIn} className="space-y-4">
                                                <motion.div
                                                    className="space-y-2"
                                                    initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
                                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                                    transition={{ ease: 'easeOut', duration: 0.2 }}
                                                >
                                                    <Label htmlFor="signin-email">Email</Label>
                                                    <Input
                                                        id="signin-email"
                                                        type="email"
                                                        placeholder="your@email.com"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        className="w-full mx-auto bg-background transition duration-200 ease-out focus:bg-primary/10 focus:border-primary focus:shadow-lg focus:animate-pulse-glow"
                                                        required
                                                        disabled={!isSupabaseConfigured}
                                                    />
                                                </motion.div>
                                                <motion.div
                                                    className="space-y-2"
                                                    initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
                                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                                    transition={{ ease: 'easeOut', duration: 0.2, delay: 0.05 }}
                                                >
                                                    <Label htmlFor="signin-password">Пароль</Label>
                                                    <Input
                                                        id="signin-password"
                                                        type="password"
                                                        placeholder="••••••••"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        className="w-full mx-auto bg-background transition duration-200 ease-out focus:bg-primary/10 focus:border-primary focus:shadow-lg focus:animate-pulse-glow"
                                                        required
                                                        disabled={!isSupabaseConfigured}
                                                    />
                                                </motion.div>
                                                <motion.div
                                                    className="space-y-2 mt-4"
                                                    initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
                                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                                    transition={{ ease: 'easeOut', duration: 0.2, delay: 0.1 }}
                                                >
                                                    <Button
                                                        type="submit"
                                                        className="w-full mx-auto transition-all duration-150 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
                                                        disabled={loading || !isSupabaseConfigured}
                                                    >
                                                        {loading ? (
                                                            <span className="flex items-center gap-2">
                                <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                Вход...
                              </span>
                                                        ) : 'Войти'}
                                                    </Button>
                                                </motion.div>
                                            </form>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="signup"
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 10 }}
                                            transition={{
                                                ease: 'easeOut',
                                                duration: 0.15,
                                            }}
                                        >
                                            <form onSubmit={handleSignUp} className="space-y-4">
                                                <motion.div
                                                    className="space-y-2"
                                                    initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
                                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                                    transition={{ ease: 'easeOut', duration: 0.2 }}
                                                >
                                                    <Label htmlFor="signup-username">Имя пользователя</Label>
                                                    <Input
                                                        id="signup-username"
                                                        type="text"
                                                        placeholder="username"
                                                        value={username}
                                                        onChange={(e) => setUsername(e.target.value)}
                                                        className="w-full mx-auto bg-background transition duration-200 ease-out focus:bg-primary/10 focus:border-primary focus:shadow-lg focus:animate-pulse-glow"
                                                        required
                                                        disabled={!isSupabaseConfigured}
                                                    />
                                                </motion.div>
                                                <motion.div
                                                    className="space-y-2"
                                                    initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
                                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                                    transition={{ ease: 'easeOut', duration: 0.2, delay: 0.05 }}
                                                >
                                                    <Label htmlFor="signup-email">Email</Label>
                                                    <Input
                                                        id="signup-email"
                                                        type="email"
                                                        placeholder="your@email.com"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        className="w-full mx-auto bg-background transition duration-200 ease-out focus:bg-primary/10 focus:border-primary focus:shadow-lg focus:animate-pulse-glow"
                                                        required
                                                        disabled={!isSupabaseConfigured}
                                                    />
                                                </motion.div>
                                                <motion.div
                                                    className="space-y-2"
                                                    initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
                                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                                    transition={{ ease: 'easeOut', duration: 0.2, delay: 0.1 }}
                                                >
                                                    <Label htmlFor="signup-password">Пароль</Label>
                                                    <Input
                                                        id="signup-password"
                                                        type="password"
                                                        placeholder="••••••••"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        className="w-full mx-auto bg-background transition duration-200 ease-out focus:bg-primary/10 focus:border-primary focus:shadow-lg focus:animate-pulse-glow"
                                                        required
                                                        minLength={6}
                                                        disabled={!isSupabaseConfigured}
                                                    />
                                                </motion.div>
                                                <motion.div
                                                    className="space-y-2 mt-4"
                                                    initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
                                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                                    transition={{ ease: 'easeOut', duration: 0.2, delay: 0.15 }}
                                                >
                                                    <Button
                                                        type="submit"
                                                        className="w-full mx-auto transition-all duration-150 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
                                                        disabled={loading || !isSupabaseConfigured}
                                                    >
                                                        {loading ? (
                                                            <span className="flex items-center gap-2">
                                <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                Регистрация...
                              </span>
                                                        ) : 'Зарегистрироваться'}
                                                    </Button>
                                                </motion.div>
                                            </form>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            )}
                        </motion.div>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
