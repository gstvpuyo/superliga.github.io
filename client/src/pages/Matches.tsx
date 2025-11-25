import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Match {
  round: number;
  matchId: number;
  homeClubId: number;
  homeClubName: string;
  awayClubId: number;
  awayClubName: string;
  homeGoals: number | null;
  awayGoals: number | null;
  status: string;
  date: string;
}

export default function Matches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRound, setSelectedRound] = useState(1);

  useEffect(() => {
    fetch("/championship-data.json")
      .then((res) => res.json())
      .then((data) => {
        setMatches(data.matches);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar dados:", err);
        setLoading(false);
      });
  }, []);

  const roundMatches = matches.filter((m) => m.round === selectedRound);
  const totalRounds = Math.max(...matches.map((m) => m.round), 1);

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
              <Button variant="ghost" className="text-white hover:bg-slate-800 bg-slate-800">Jogos</Button>
            </Link>
            <Link href="/clubs">
              <Button variant="ghost" className="text-white hover:bg-slate-800">Clubes</Button>
            </Link>
            <Link href="/rules">
              <Button variant="ghost" className="text-white hover:bg-slate-800">Regras</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-4xl font-bold text-white mb-8">Jogos</h2>

        {/* Round Selector */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {Array.from({ length: totalRounds }, (_, i) => i + 1).map((round) => (
            <Button
              key={round}
              onClick={() => setSelectedRound(round)}
              variant={selectedRound === round ? "default" : "outline"}
              className={selectedRound === round ? "bg-blue-600 hover:bg-blue-700" : "border-slate-500 text-white hover:bg-slate-800"}
            >
              Rodada {round}
            </Button>
          ))}
        </div>

        {/* Matches */}
        {loading ? (
          <div className="text-center text-slate-400 py-8">Carregando dados...</div>
        ) : (
          <div className="space-y-4">
            {roundMatches.length === 0 ? (
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="py-8 text-center text-slate-400">
                  Nenhum jogo nesta rodada
                </CardContent>
              </Card>
            ) : (
              roundMatches.map((match) => (
                <Card key={match.matchId} className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors">
                  <CardContent className="py-6">
                    <div className="flex items-center justify-between">
                      {/* Home Team */}
                      <div className="flex-1 text-right pr-4">
                        <p className="text-white font-semibold text-lg">{match.homeClubName}</p>
                        <p className="text-slate-400 text-sm">{match.date}</p>
                      </div>

                      {/* Score */}
                      <div className="px-6 py-4 bg-slate-700 rounded-lg min-w-24 text-center">
                        {match.homeGoals !== null && match.awayGoals !== null ? (
                          <div className="text-2xl font-bold text-white">
                            {match.homeGoals} x {match.awayGoals}
                          </div>
                        ) : (
                          <div className="text-slate-400">vs</div>
                        )}
                      </div>

                      {/* Away Team */}
                      <div className="flex-1 text-left pl-4">
                        <p className="text-white font-semibold text-lg">{match.awayClubName}</p>
                        <p className="text-slate-400 text-sm">{match.status === "scheduled" ? "Agendado" : "Finalizado"}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
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
