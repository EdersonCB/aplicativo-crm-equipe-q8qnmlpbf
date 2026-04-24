import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Users,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react'
import { mockActivities, mockChartData, mockTasks } from '@/lib/mock-data'
import { useState } from 'react'

export default function Index() {
  const [tasks, setTasks] = useState(mockTasks.filter((t) => t.owner === 'Você').slice(0, 5))

  const toggleTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  const chartConfig = {
    atual: { label: 'Vendas Atuais', color: 'hsl(var(--primary))' },
    previsto: { label: 'Previsão', color: 'hsl(var(--muted-foreground) / 0.3)' },
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Metrics Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Vendas
            </CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 142.500</div>
            <p className="flex items-center text-xs text-success mt-1">
              <ArrowUpRight className="mr-1 h-3 w-3" /> +12.5% em relação ao mês passado
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Leads Novos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+234</div>
            <p className="flex items-center text-xs text-success mt-1">
              <ArrowUpRight className="mr-1 h-3 w-3" /> +4.1% nesta semana
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Taxa de Conversão
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18.2%</div>
            <p className="flex items-center text-xs text-danger mt-1">
              <ArrowDownRight className="mr-1 h-3 w-3" /> -1.2% neste mês
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tarefas para Hoje
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">4 de alta prioridade</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-7 lg:grid-cols-8">
        {/* Main Chart */}
        <Card className="col-span-full lg:col-span-5">
          <CardHeader>
            <CardTitle>Pipeline de Vendas</CardTitle>
            <CardDescription>
              Comparativo de vendas atuais vs. previsão nos últimos 6 meses.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <BarChart data={mockChartData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `R$${value / 1000}k`}
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="previsto" fill="var(--color-previsto)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="atual" fill="var(--color-atual)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Side Panel: Activities & Tasks */}
        <div className="col-span-full lg:col-span-3 flex flex-col gap-6">
          <Card className="flex-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Atividades Recentes</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              {mockActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 text-sm">
                  <div className="mt-0.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                  <div className="flex-1 space-y-1">
                    <p className="leading-none">
                      <span className="font-medium text-foreground">{activity.user}</span>{' '}
                      <span className="text-muted-foreground">{activity.action}</span>{' '}
                      <span className="font-medium text-foreground">{activity.target}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="flex-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Próximas Tarefas</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-start space-x-3 rounded-md border p-3 transition-colors hover:bg-muted/50"
                >
                  <Checkbox
                    id={task.id}
                    checked={task.completed}
                    onCheckedChange={() => toggleTask(task.id)}
                    className="mt-0.5"
                  />
                  <div className="flex flex-1 flex-col space-y-1">
                    <label
                      htmlFor={task.id}
                      className={`text-sm font-medium leading-none cursor-pointer ${task.completed ? 'line-through text-muted-foreground' : ''}`}
                    >
                      {task.title}
                    </label>
                    <p className="text-xs text-muted-foreground">{task.date}</p>
                  </div>
                  <Badge
                    variant={
                      task.priority === 'Alta'
                        ? 'destructive'
                        : task.priority === 'Média'
                          ? 'default'
                          : 'secondary'
                    }
                    className="text-[10px] uppercase"
                  >
                    {task.priority}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
