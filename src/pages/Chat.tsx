import TaylorChat from '@/components/TaylorChat';

export default function Chat() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <div className="container mx-auto max-w-7xl pt-8">
        <TaylorChat />
      </div>
    </div>
  );
}
