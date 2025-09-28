import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";

const Rules = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-crystal via-crystal-glow to-gold bg-clip-text text-transparent">
              Правила сервера
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Добро пожаловать в мир Aetherium! Ознакомьтесь с правилами для комфортной игры.
            </p>
          </div>

          <Card className="max-w-4xl mx-auto p-8 bg-card/80 backdrop-blur-sm border-border/50">
            <div className="prose prose-invert max-w-none">
              <div className="text-center py-12">
                <div className="inline-block p-6 rounded-full bg-crystal/10 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-crystal to-crystal-glow crystal-glow"></div>
                </div>
                <h2 className="text-2xl font-semibold text-crystal mb-4">
                  Правила скоро будут добавлены
                </h2>
                <p className="text-muted-foreground">
                  Администрация работает над составлением подробных правил сервера.
                  Следите за обновлениями в наших социальных сетях!
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Rules;