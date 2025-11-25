import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Club {
  id: number;
  name: string;
  owner: string;
  logo: string;
  color: string;
}

export default function Clubs() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/championship-data.json")
      .then((res) => res.json())
      .then((data) => {
        setClubs(data.clubs);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar dados:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="bg-slate-950 border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚽</span>
            <h1 className="text-xl font-bold text-white">Copa PES 2013</h1>
          </div>
          <div className="flex gap-2">
            <Link href="/">
              <Button variant="ghost" className="text-white hover:bg-slate-800">Home</Button>
            </Link>
            <Link href="/standings">
              <Button variant="ghost" className="text-white hover:bg-slate-800">Classificação</Button>
            </Link>
            <Link href="/matches">
              <Button variant="ghost" className="text-white hover:bg-slate-800">Jogos</Button>
            </Link>
            <Link href="/clubs">
              <Button variant="ghost" className="text-white hover:bg-slate-800 bg-slate-800">Clubes</Button>
            </Link>
            <Link href="/rules">
              <Button variant="ghost" className="text-white hover:bg-slate-800">Regras</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-4xl font-bold text-white mb-8">Clubes Participantes</h2>

        {loading ? (
          <div className="text-center text-slate-400 py-8">Carregando dados...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubs.map((club) => (
              <Card
                key={club.id}
                className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-all hover:shadow-lg"
                style={{ borderLeftColor: club.color, borderLeftWidth: "4px" }}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{club.logo}</span>
                    <div>
                      <CardTitle className="text-white">{club.name}</CardTitle>
                      <p className="text-sm text-slate-400">Dono: {club.owner}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Status</span>
                      <span className="text-green-400 font-semibold">Ativo</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Cor</span>
                      <div
                        className="w-6 h-6 rounded border border-slate-600"
                        style={{ backgroundColor: club.color }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-slate-400">
          <p>Copa PES 2013 - Edição PARSEC © 2024</p>
        </div>
      </footer>
    </div>
  );
}
