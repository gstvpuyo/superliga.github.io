import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("clubs");
  
  // Clubs form state
  const [clubForm, setClubForm] = useState({
    name: "",
    owner: "",
    color: "#000000",
    logo: "",
  });

  // Matches form state
  const [matchForm, setMatchForm] = useState({
    round: "1",
    homeClubId: "",
    awayClubId: "",
    homeGoals: "",
    awayGoals: "",
    date: new Date().toISOString().split("T")[0],
  });

  // Match result form state
  const [resultForm, setResultForm] = useState({
    matchId: "",
    homeGoals: "",
    awayGoals: "",
  });

  // Queries
  const { data: clubs = [] } = trpc.championship.clubs.getAll.useQuery();
  const { data: matches = [] } = trpc.championship.matches.getAll.useQuery();
  const { data: standings = [] } = trpc.championship.standings.getAll.useQuery();

  // Mutations
  const createClubMutation = trpc.championship.clubs.create.useMutation();
  const createMatchMutation = trpc.championship.matches.create.useMutation();
  const updateMatchMutation = trpc.championship.matches.update.useMutation();

  const handleAddClub = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createClubMutation.mutateAsync(clubForm);
      toast.success("Clube adicionado com sucesso!");
      setClubForm({ name: "", owner: "", color: "#000000", logo: "" });
    } catch (error) {
      toast.error("Erro ao adicionar clube");
    }
  };

  const handleCreateMatch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMatchMutation.mutateAsync({
        round: parseInt(matchForm.round),
        homeClubId: parseInt(matchForm.homeClubId),
        awayClubId: parseInt(matchForm.awayClubId),
        date: new Date(matchForm.date),
      });
      toast.success("Jogo criado com sucesso!");
      setMatchForm({
        round: "1",
        homeClubId: "",
        awayClubId: "",
        homeGoals: "",
        awayGoals: "",
        date: new Date().toISOString().split("T")[0],
      });
    } catch (error) {
      toast.error("Erro ao criar jogo");
    }
  };

  const handleUpdateMatch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resultForm.matchId || !resultForm.homeGoals || !resultForm.awayGoals) {
      toast.error("Preencha todos os campos para salvar o resultado.");
      return;
    }

    try {
      await updateMatchMutation.mutateAsync({
        matchId: parseInt(resultForm.matchId),
        homeGoals: parseInt(resultForm.homeGoals),
        awayGoals: parseInt(resultForm.awayGoals),
        status: "finished",
      });
      toast.success("Resultado atualizado com sucesso!");
      setResultForm({ matchId: "", homeGoals: "", awayGoals: "" });
    } catch (error) {
      toast.error("Erro ao atualizar resultado");
    }
  };

  const handlePrefillResultForm = (matchId: number) => {
    setResultForm({
      ...resultForm,
      matchId: String(matchId),
    });
    // For a better user experience, we can also focus the input field
    // This requires a ref, which is out of scope for this example
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="bg-slate-950 border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚙️</span>
            <h1 className="text-xl font-bold text-white">Painel Administrativo</h1>
          </div>
          <Link href="/">
            <Button variant="ghost" className="text-white hover:bg-slate-800">
              Voltar ao Site
            </Button>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800 border border-slate-700">
            <TabsTrigger value="clubs" className="text-white">Clubes</TabsTrigger>
            <TabsTrigger value="matches" className="text-white">Jogos</TabsTrigger>
            <TabsTrigger value="standings" className="text-white">Classificação</TabsTrigger>
          </TabsList>

          {/* Clubs Tab */}
          <TabsContent value="clubs" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Add Club Form */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Adicionar Novo Clube</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddClub} className="space-y-4">
                    <div>
                      <label className="block text-sm text-slate-300 mb-2">Nome do Clube</label>
                      <Input
                        value={clubForm.name}
                        onChange={(e) => setClubForm({ ...clubForm, name: e.target.value })}
                        placeholder="Ex: GALLATOS FC"
                        className="bg-slate-700 border-slate-600 text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-300 mb-2">Dono/Jogador</label>
                      <Input
                        value={clubForm.owner}
                        onChange={(e) => setClubForm({ ...clubForm, owner: e.target.value })}
                        placeholder="Ex: João Silva"
                        className="bg-slate-700 border-slate-600 text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-300 mb-2">Cor (Hex)</label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={clubForm.color}
                          onChange={(e) => setClubForm({ ...clubForm, color: e.target.value })}
                          className="w-16 h-10 bg-slate-700 border-slate-600"
                        />
                        <Input
                          value={clubForm.color}
                          onChange={(e) => setClubForm({ ...clubForm, color: e.target.value })}
                          placeholder="#000000"
                          className="flex-1 bg-slate-700 border-slate-600 text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-slate-300 mb-2">Logo (URL)</label>
                      <Input
                        value={clubForm.logo}
                        onChange={(e) => setClubForm({ ...clubForm, logo: e.target.value })}
                        placeholder="https://exemplo.com/logo.png"
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={createClubMutation.isPending}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {createClubMutation.isPending ? "Salvando..." : "Adicionar Clube"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Clubs List */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Clubes Cadastrados ({clubs.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {clubs.length === 0 ? (
                      <p className="text-slate-400">Nenhum clube cadastrado ainda</p>
                    ) : (
                      clubs.map((club) => (
                        <div
                          key={club.id}
                          className="p-3 bg-slate-700 rounded border border-slate-600 text-white"
                        >
                          <div className="flex items-center gap-3">
                            {club.logo && (
                              <img
                                src={club.logo}
                                alt={club.name}
                                className="w-8 h-8 rounded"
                              />
                            )}
                            <div className="flex-1">
                              <p className="font-semibold">{club.name}</p>
                              <p className="text-sm text-slate-400">{club.owner}</p>
                            </div>
                            {club.color && (
                              <div
                                className="w-6 h-6 rounded border border-slate-500"
                                style={{ backgroundColor: club.color }}
                              />
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Matches Tab */}
          <TabsContent value="matches" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Create Match Form */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Criar Novo Jogo</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleCreateMatch} className="space-y-4">
                    <div>
                      <label className="block text-sm text-slate-300 mb-2">Rodada</label>
                      <Select value={matchForm.round} onValueChange={(value) => setMatchForm({ ...matchForm, round: value })}>
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 11 }, (_, i) => (
                            <SelectItem key={i + 1} value={String(i + 1)}>
                              Rodada {i + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm text-slate-300 mb-2">Time da Casa</label>
                      <Select value={matchForm.homeClubId} onValueChange={(value) => setMatchForm({ ...matchForm, homeClubId: value })}>
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue placeholder="Selecione um clube" />
                        </SelectTrigger>
                        <SelectContent>
                          {clubs.map((club) => (
                            <SelectItem key={club.id} value={String(club.id)}>
                              {club.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm text-slate-300 mb-2">Time Visitante</label>
                      <Select value={matchForm.awayClubId} onValueChange={(value) => setMatchForm({ ...matchForm, awayClubId: value })}>
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                          <SelectValue placeholder="Selecione um clube" />
                        </SelectTrigger>
                        <SelectContent>
                          {clubs.map((club) => (
                            <SelectItem key={club.id} value={String(club.id)}>
                              {club.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm text-slate-300 mb-2">Data</label>
                      <Input
                        type="date"
                        value={matchForm.date}
                        onChange={(e) => setMatchForm({ ...matchForm, date: e.target.value })}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={createMatchMutation.isPending}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      {createMatchMutation.isPending ? "Criando..." : "Criar Jogo"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Add Match Result Form */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Inserir Resultado da Partida</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpdateMatch} className="space-y-4">
                    <Select
                      value={resultForm.matchId}
                      onValueChange={(value) => setResultForm({ ...resultForm, matchId: value })}
                    >
                      <SelectTrigger className="w-full bg-slate-700 border-slate-600 text-white">
                        <SelectValue placeholder="Selecione a partida" />
                      </SelectTrigger>
                      <SelectContent>
                        {matches
                          .filter((match) => match.status === "scheduled")
                          .map((match) => {
                            const homeClub = clubs.find((c) => c.id === match.homeClubId);
                            const awayClub = clubs.find((c) => c.id === match.awayClubId);
                            return (
                              <SelectItem key={match.id} value={String(match.id)}>
                                {homeClub?.name} vs {awayClub?.name} (Rodada {match.round})
                              </SelectItem>
                            );
                          })}
                      </SelectContent>
                    </Select>
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        type="number"
                        placeholder="Gols Casa"
                        value={resultForm.homeGoals}
                        onChange={(e) => setResultForm({ ...resultForm, homeGoals: e.target.value })}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                      <Input
                        type="number"
                        placeholder="Gols Visitante"
                        value={resultForm.awayGoals}
                        onChange={(e) => setResultForm({ ...resultForm, awayGoals: e.target.value })}
                        className="bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={updateMatchMutation.isPending}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      {updateMatchMutation.isPending ? "Salvando..." : "Salvar Resultado"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Matches List */}
              <Card className="bg-slate-800 border-slate-700 lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-white">Jogos Cadastrados ({matches.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {matches.length === 0 ? (
                      <p className="text-slate-400">Nenhum jogo cadastrado ainda</p>
                    ) : (
                      matches.map((match) => {
                        const homeClub = clubs.find((c) => c.id === match.homeClubId);
                        const awayClub = clubs.find((c) => c.id === match.awayClubId);
                        return (
                          <div
                            key={match.id}
                            className="p-3 bg-slate-700 rounded border border-slate-600 text-white"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <p className="text-sm text-slate-400">Rodada {match.round}</p>
                              <span className={`text-xs px-2 py-1 rounded ${
                                match.status === "finished"
                                  ? "bg-green-600"
                                  : "bg-yellow-600"
                              }`}>
                                {match.status === "finished" ? "Finalizado" : "Agendado"}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">{homeClub?.name || "Time " + match.homeClubId}</span>
                              <span className="font-bold">
                                {match.homeGoals !== null ? match.homeGoals : "-"} x{" "}
                                {match.awayGoals !== null ? match.awayGoals : "-"}
                              </span>
                              <span className="text-sm">{awayClub?.name || "Time " + match.awayClubId}</span>
                            </div>
                            {match.status === "scheduled" && (
                              <Button
                                size="sm"
                                onClick={() => handlePrefillResultForm(match.id)}
                                className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white text-xs"
                              >
                                Inserir Resultado
                              </Button>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Standings Tab */}
          <TabsContent value="standings" className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Classificação Atual</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-slate-300">
                    <thead>
                      <tr className="border-b border-slate-600">
                        <th className="text-left py-2 px-2">Pos</th>
                        <th className="text-left py-2 px-2">Clube</th>
                        <th className="text-center py-2 px-2">PJ</th>
                        <th className="text-center py-2 px-2">V</th>
                        <th className="text-center py-2 px-2">E</th>
                        <th className="text-center py-2 px-2">D</th>
                        <th className="text-center py-2 px-2">GP</th>
                        <th className="text-center py-2 px-2">GC</th>
                        <th className="text-center py-2 px-2">SG</th>
                        <th className="text-center py-2 px-2 font-bold">PTS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {standings.length === 0 ? (
                        <tr>
                          <td colSpan={10} className="text-center py-4 text-slate-400">
                            Nenhum dado de classificação
                          </td>
                        </tr>
                      ) : (
                        standings.map((standing) => {
                          const club = clubs.find((c) => c.id === standing.clubId);
                          return (
                            <tr key={standing.id} className="border-b border-slate-700 hover:bg-slate-700/50">
                              <td className="py-2 px-2 text-white font-bold">{standing.position}</td>
                              <td className="py-2 px-2 text-white">{club?.name || "Clube " + standing.clubId}</td>
                              <td className="text-center py-2 px-2">{standing.played}</td>
                              <td className="text-center py-2 px-2 text-green-400">{standing.wins}</td>
                              <td className="text-center py-2 px-2 text-yellow-400">{standing.draws}</td>
                              <td className="text-center py-2 px-2 text-red-400">{standing.losses}</td>
                              <td className="text-center py-2 px-2">{standing.goalsFor}</td>
                              <td className="text-center py-2 px-2">{standing.goalsAgainst}</td>
                              <td className="text-center py-2 px-2">{standing.goalDifference}</td>
                              <td className="text-center py-2 px-2 text-white font-bold">{standing.points}</td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-slate-400">
          <p>Painel Administrativo - Liga PES 13 © 2024</p>
        </div>
      </footer>
    </div>
  );
}
