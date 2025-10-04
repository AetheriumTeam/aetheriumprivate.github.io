import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Menu, X, LogOut, User, MessageSquare } from 'lucide-react';
import logo from '@/assets/aetherium-logo.png';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: 'Ошибка',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Выход выполнен',
        description: 'Вы вышли из аккаунта',
      });
      navigate('/');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Aetherium" className="h-10 w-10 object-contain" />
            <span className="text-xl font-bold text-secondary">Aetherium</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Главная
            </Link>
            {user && (
              <>
                <Link to="/profile" className="text-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  AI Ассистент
                </Link>
                <Link to="/profile" className="text-foreground hover:text-primary transition-colors flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Профиль
                </Link>
                <Button onClick={handleSignOut} variant="outline" size="sm" className="flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  Выйти
                </Button>
              </>
            )}
            {!user && (
              <Link to="/auth">
                <Button size="sm">Войти</Button>
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-border">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-2 text-foreground hover:text-primary hover:bg-muted/50 rounded transition-colors"
            >
              Главная
            </Link>
            {user && (
              <>
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-2 text-foreground hover:text-primary hover:bg-muted/50 rounded transition-colors flex items-center gap-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  AI Ассистент
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-2 text-foreground hover:text-primary hover:bg-muted/50 rounded transition-colors flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Профиль
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-muted/50 rounded transition-colors flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Выйти
                </button>
              </>
            )}
            {!user && (
              <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full">Войти</Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
