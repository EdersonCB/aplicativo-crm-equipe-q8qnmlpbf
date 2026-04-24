import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar } from '@/components/ui/calendar'
import { mockTasks } from '@/lib/mock-data'
import { Plus, ListTodo, Calendar as CalendarIcon, AlignLeft } from 'lucide-react'

export default function Tarefas() {
  const [tasks, setTasks] = useState(mockTasks)
  const [date, setDate] = useState<Date | undefined>(new Date())

  const toggleTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Alta':
        return 'destructive'
      case 'Média':
        return 'default'
      case 'Baixa':
        return 'secondary'
      default:
        return 'outline'
    }
  }

  const renderTaskList = (filterOwner?: string) => {
    const displayTasks = filterOwner ? tasks.filter((t) => t.owner === filterOwner) : tasks

    return (
      <div className="space-y-3 mt-4">
        {displayTasks.map((task) => (
          <Card
            key={task.id}
            className={`transition-all ${task.completed ? 'opacity-60 bg-muted/30' : 'hover:shadow-md'}`}
          >
            <CardContent className="p-4 flex items-start sm:items-center gap-4 flex-col sm:flex-row">
              <div className="flex items-center gap-3 flex-1 w-full">
                <Checkbox
                  id={`list-${task.id}`}
                  checked={task.completed}
                  onCheckedChange={() => toggleTask(task.id)}
                  className="h-5 w-5 rounded-full"
                />
                <div className="flex flex-col">
                  <label
                    htmlFor={`list-${task.id}`}
                    className={`font-medium cursor-pointer ${task.completed ? 'line-through text-muted-foreground' : ''}`}
                  >
                    {task.title}
                  </label>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <span>{task.date}</span>
                    <span className="w-1 h-1 rounded-full bg-border"></span>
                    <span>Resp: {task.owner}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 self-end sm:self-auto w-full sm:w-auto justify-between sm:justify-start pl-8 sm:pl-0">
                <Badge
                  variant={getPriorityColor(task.priority) as any}
                  className="uppercase text-[10px]"
                >
                  {task.priority}
                </Badge>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                  <AlignLeft className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {displayTasks.length === 0 && (
          <div className="text-center p-8 text-muted-foreground border rounded-lg border-dashed">
            Nenhuma tarefa encontrada.
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tarefas</h1>
          <p className="text-muted-foreground">Organize suas pendências diárias.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Nova Tarefa
        </Button>
      </div>

      <Tabs defaultValue="lista" className="w-full">
        <div className="flex items-center justify-between pb-4 border-b">
          <TabsList className="bg-muted">
            <TabsTrigger value="lista" className="gap-2">
              <ListTodo className="h-4 w-4" /> Lista
            </TabsTrigger>
            <TabsTrigger value="calendario" className="gap-2">
              <CalendarIcon className="h-4 w-4" /> Calendário
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="lista" className="mt-6">
          <Tabs defaultValue="minhas" className="w-full">
            <TabsList className="w-full sm:w-auto grid grid-cols-2 bg-transparent border-b rounded-none p-0 h-auto">
              <TabsTrigger
                value="minhas"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none pb-2"
              >
                Minhas Tarefas
              </TabsTrigger>
              <TabsTrigger
                value="equipe"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none pb-2"
              >
                Tarefas da Equipe
              </TabsTrigger>
            </TabsList>
            <TabsContent value="minhas" className="outline-none">
              {renderTaskList('Você')}
            </TabsContent>
            <TabsContent value="equipe" className="outline-none">
              {renderTaskList()}
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="calendario" className="mt-6">
          <Card>
            <CardContent className="p-6 flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-auto flex justify-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border shadow-sm p-4"
                />
              </div>
              <div className="flex-1 space-y-4">
                <h3 className="font-semibold text-lg border-b pb-2">
                  Tarefas para {date ? date.toLocaleDateString('pt-BR') : 'a data selecionada'}
                </h3>
                {renderTaskList('Você')} {/* Simplificado para mostrar sempre algo */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
