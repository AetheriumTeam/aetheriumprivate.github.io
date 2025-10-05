import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import { useAuth } from './hooks/useAuth';
import ProtectedRoute from './components/ProtectedRoute';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import logo from '@/assets/aetherium-logo.png';

function Landing() {
    return (
        <div className="min-h-screen bg-background">
            <iframe
                src="/landing.html"
                className="w-full h-screen border-0"
                title="Aetherium Landing"
            />
        </div>
    );
}

function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center space-y-8">
                {/* Animated 404 */}
                <div className="relative">
                    <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary animate-pulse">
                        404
                    </h1>
                    <div className="absolute inset-0 blur-3xl opacity-30 bg-gradient-to-r from-primary to-secondary" />
                </div>

                {/* Message */}
                <div className="space-y-3">
                    <h2 className="text-2xl font-semibold text-foreground">
                        Страница не найдена
                    </h2>
                    <p className="text-muted-foreground">
                        Похоже, вы попали в неизведанную область Aetherium.
                        Эта страница не существует или была перемещена.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                        onClick={() => navigate('/home')}
                        size="lg"
                        className="w-full sm:w-auto"
                    >
                        На главную
                    </Button>
                    <Button
                        onClick={() => navigate(-1)}
                        variant="outline"
                        size="lg"
                        className="w-full sm:w-auto"
                    >
                        Назад
                    </Button>
                </div>

                {/* Decorative elements */}
                <div className="pt-8 flex justify-center gap-2 opacity-50">
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-secondary animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
            </div>
        </div>
    );
}

function App() {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-pulse text-foreground">Загрузка...</div>
            </div>
        );
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/home" replace />} />
                <Route path="/home" element={<Landing />} />
                <Route path="/auth" element={user ? <Navigate to="/profile" /> : <Auth />} />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/chat"
                    element={
                        <ProtectedRoute>
                            <Chat />
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
        </BrowserRouter>
    );
}

export default App;
