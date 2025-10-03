import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';

export default function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('signin');
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
            <Card className="w-full max-w-md animate-in fade-in-0 zoom-in-98 duration-700 overflow-hidden">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-in slide-in-from-top-2 duration-1000">
                        Aetherium
                    </CardTitle>
                    <CardDescription className="animate-in fade-in-0 slide-in-from-top-1 duration-1000 delay-150">
                        Войдите или зарегистрируйтесь
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-2 p-1 bg-muted/50 backdrop-blur-sm relative">
                            <motion.div
                                className="absolute inset-y-1 w-[calc(50%-4px)] bg-background shadow-lg rounded-md"
                                initial={false}
                                animate={{
                                    left: activeTab === 'signin' ? '4px' : 'calc(50% + 0px)',
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30
                                }}
                            />
                            <TabsTrigger
                                value="signin"
                                className="relative z-10 transition-all duration-300 data-[state=active]:text-foreground text-muted-foreground"
                            >
                                Вход
                            </TabsTrigger>
                            <TabsTrigger
                                value="signup"
                                className="relative z-10 transition-all duration-300 data-[state=active]:text-foreground text-muted-foreground"
                            >
                                Регистрация
                            </TabsTrigger>
                        </TabsList>

                        // TabsList animation (faster tab switch)
                        <motion.div
                            className="absolute inset-y-1 w-[calc(50%-4px)] bg-background shadow-lg rounded-md"
                            initial={false}
                            animate={{
                                left: activeTab === 'signin' ? '4px' : 'calc(50% + 0px)',
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 500, // Increased stiffness for faster spring
                                damping: 20,   // Reduced damping for quicker settling
                                duration: 0.3  // Fallback duration for non-spring animations
                            }}
                        />

                        // Form container height animation
                        <motion.div
                            className="relative mt-4 overflow-hidden"
                            animate={{
                                height: activeTab === 'signin' ? 240 : 320
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 500, // Increased stiffness
                                damping: 20,   // Reduced damping
                                duration: 0.3  // Faster fallback
                            }}
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                {activeTab === 'signin' ? (
                                    <motion.div
                                        key="signin"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 500, // Faster spring
                                            damping: 20,   // Less resistance
                                            duration: 0.2  // Faster fallback
                                        }}
                                    >
                                        <form onSubmit={handleSignIn} className="space-y-4">
                                            <motion.div
                                                className="space-y-2"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.05, duration: 0.2 }} // Reduced delay and duration
                                            >
                                                <Label htmlFor="signin-email">Email</Label>
                                                <Input
                                                    id="signin-email"
                                                    type="email"
                                                    placeholder="your@email.com"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="transition-all duration-200 focus:scale-[1.01] focus:shadow-lg focus:shadow-primary/20" // Reduced CSS transition duration
                                                    required
                                                />
                                            </motion.div>
                                            <motion.div
                                                className="space-y-2"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.1, duration: 0.2 }} // Reduced delay and duration
                                            >
                                                <Label htmlFor="signin-password">Пароль</Label>
                                                <Input
                                                    id="signin-password"
                                                    type="password"
                                                    placeholder="••••••••"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="transition-all duration-200 focus:scale-[1.01] focus:shadow-lg focus:shadow-primary/20" // Reduced CSS transition duration
                                                    required
                                                />
                                            </motion.div>
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.15, duration: 0.2 }} // Reduced delay and duration
                                            >
                                                <Button
                                                    type="submit"
                                                    className="w-full transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]" // Reduced CSS transition duration
                                                    disabled={loading}
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
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 500, // Faster spring
                                            damping: 20,   // Less resistance
                                            duration: 0.2  // Faster fallback
                                        }}
                                    >
                                        <form onSubmit={handleSignUp} className="space-y-4">
                                            <motion.div
                                                className="space-y-2"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.05, duration: 0.2 }} // Reduced delay and duration
                                            >
                                                <Label htmlFor="signup-username">Имя пользователя</Label>
                                                <Input
                                                    id="signup-username"
                                                    type="text"
                                                    placeholder="username"
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                    className="transition-all duration-200 focus:scale-[1.01] focus:shadow-lg focus:shadow-primary/20" // Reduced CSS transition duration
                                                    required
                                                />
                                            </motion.div>
                                            <motion.div
                                                className="space-y-2"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.1, duration: 0.2 }} // Reduced delay and duration
                                            >
                                                <Label htmlFor="signup-email">Email</Label>
                                                <Input
                                                    id="signup-email"
                                                    type="email"
                                                    placeholder="your@email.com"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="transition-all duration-200 focus:scale-[1.01] focus:shadow-lg focus:shadow-primary/20" // Reduced CSS transition duration
                                                    required
                                                />
                                            </motion.div>
                                            <motion.div
                                                className="space-y-2"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.15, duration: 0.2 }} // Reduced delay and duration
                                            >
                                                <Label htmlFor="signup-password">Пароль</Label>
                                                <Input
                                                    id="signup-password"
                                                    type="password"
                                                    placeholder="••••••••"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="transition-all duration-200 focus:scale-[1.01] focus:shadow-lg focus:shadow-primary/20" // Reduced CSS transition duration
                                                    required
                                                    minLength={6}
                                                />
                                            </motion.div>
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2, duration: 0.2 }} // Reduced delay and duration
                                            >
                                                <Button
                                                    type="submit"
                                                    className="w-full transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]" // Reduced CSS transition duration
                                                    disabled={loading}
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
                        </motion.div>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}