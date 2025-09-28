import Navigation from "@/components/Navigation";
import SocialLinks from "@/components/SocialLinks";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Trophy, Sparkles } from "lucide-react";
import aetheriumLogo from "@/assets/aetherium-logo.png";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <img 
              src={aetheriumLogo} 
              alt="Aetherium" 
              className="mx-auto h-32 w-auto float-animation mb-6"
            />
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-crystal via-crystal-glow to-gold bg-clip-text text-transparent">
              AETHERIUM
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Приватный Minecraft сервер с уникальной системой сезонов. 
              Каждые 6 месяцев — новое приключение!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                asChild
                size="lg"
                className="bg-gradient-to-r from-crystal to-primary hover:from-crystal-glow hover:to-crystal text-background font-semibold crystal-glow px-8 py-3 text-lg"
              >
                <a 
                  href="https://forms.gle/6DjRB2uywYb2P5C26" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Подать анкету
                </a>
              </Button>
              
              <Button 
                asChild
                variant="outline"
                size="lg"
                className="border-crystal text-crystal hover:bg-crystal/10 px-8 py-3 text-lg"
              >
                <a href="/rules">
                  Правила сервера
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-crystal to-gold bg-clip-text text-transparent">
              Как это работает
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Уникальная система сезонов и межсезоний создает постоянно обновляющийся игровой опыт
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50 hover:border-crystal/50 transition-all duration-300">
              <div className="flex items-center mb-4">
                <Calendar className="h-8 w-8 text-crystal mr-3" />
                <Badge variant="outline" className="border-crystal text-crystal">
                  6 месяцев
                </Badge>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-crystal">
                Основной сезон
              </h3>
              <p className="text-muted-foreground">
                Основной мир, кланы, ивенты, развитие и лор. Каждый сезон имеет свою уникальную тему, стиль и атмосферу.
              </p>
            </Card>

            <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50 hover:border-crystal/50 transition-all duration-300">
              <div className="flex items-center mb-4">
                <Sparkles className="h-8 w-8 text-gold mr-3" />
                <Badge variant="outline" className="border-gold text-gold">
                  1 месяц
                </Badge>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gold">
                Межсезонье
              </h3>
              <p className="text-muted-foreground">
                Временное приключение для всей комьюнити с новой идеей. Мини-режимы, которых нигде больше нет.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Rewards Section */}
      <section className="py-16 px-4 bg-muted/20">
        <div className="container mx-auto text-center">
          <Trophy className="h-16 w-16 text-gold mx-auto mb-6 sparkle" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-gold to-crystal bg-clip-text text-transparent">
            А что мне с этого?
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50">
              <div className="flex items-start space-x-4">
                <Trophy className="h-6 w-6 text-gold mt-1 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-foreground">
                    <strong className="text-gold">Редкие награды:</strong> Участники межсезоний получают уникальные титулы, предметы и достижения для следующего сезона.
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50">
              <div className="flex items-start space-x-4">
                <Users className="h-6 w-6 text-crystal mt-1 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-foreground">
                    <strong className="text-crystal">Слава навечно:</strong> Самые активные и героические игроки будут увековечены в истории Aetherium.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Links Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 bg-gradient-to-r from-crystal to-gold bg-clip-text text-transparent">
            Наши социальные сети
          </h2>
          <SocialLinks />
          <p className="text-muted-foreground mt-6">
            Следите за новостями и обновлениями сервера
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border/50">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">
            © 2024 Aetherium Server. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;