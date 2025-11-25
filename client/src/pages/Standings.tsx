import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { trpc } from "@/lib/trpc";

export default function Standings() {
  const { data: standings = [], isLoading: loading } = trpc.championship.standings.getAll.useQuery();

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
              <Button variant="ghost" className="text-white hover:bg-slate-800 bg-slate-800">Classificação</Button>
            </Link>
            <Link href="/matches">
              <Button variant="ghost" className="text-white hover:bg-slate-800">Jogos</Button>
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
        <h2 className="text-4xl font-bold text-white mb-8">Tabela de Classificação</h2>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Fase de Pontos Corridos</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center text-slate-400 py-8">Carregando dados...</div>
            ) : standings.length === 0 ? (
              <div className="text-center text-slate-400 py-8">Nenhum dado disponível</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700 hover:bg-slate-700/50">
                      <TableHead className="text-slate-300">Pos</TableHead>
                      <TableHead className="text-slate-300">Clube</TableHead>
                      <TableHead className="text-center text-slate-300">PJ</TableHead>
                      <TableHead className="text-center text-slate-300">V</TableHead>
                      <TableHead className="text-center text-slate-300">E</TableHead>
                      <TableHead className="text-center text-slate-300">D</TableHead>
                      <TableHead className="text-center text-slate-300">GP</TableHead>
                      <TableHead className="text-center text-slate-300">GC</TableHead>
                      <TableHead className="text-center text-slate-300">SG</TableHead>
                      <TableHead className="text-center text-slate-300 font-bold">PTS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {standings.map((standing) => (
                      <TableRow
                        key={standing.id}
                        className="border-slate-700 hover:bg-slate-700/50 transition-colors"
                      >
                        <TableCell className="text-white font-bold">{standing.position}</TableCell>
                        <TableCell className="text-white font-medium">Clube {standing.clubId}</TableCell>
                        <TableCell className="text-center text-slate-300">{standing.played}</TableCell>
                        <TableCell className="text-center text-green-400">{standing.wins}</TableCell>
                        <TableCell className="text-center text-yellow-400">{standing.draws}</TableCell>
                        <TableCell className="text-center text-red-400">{standing.losses}</TableCell>
                        <TableCell className="text-center text-slate-300">{standing.goalsFor}</TableCell>
                        <TableCell className="text-center text-slate-300">{standing.goalsAgainst}</TableCell>
                        <TableCell className="text-center text-slate-300">{standing.goalDifference}</TableCell>
                        <TableCell className="text-center text-white font-bold text-lg">{standing.points}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Legend */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-green-400 font-bold">V</span>
            <span>Vitórias</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-yellow-400 font-bold">E</span>
            <span>Empates</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-red-400 font-bold">D</span>
            <span>Derrotas</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-white font-bold">PTS</span>
            <span>Pontos</span>
          </div>
        </div>
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
