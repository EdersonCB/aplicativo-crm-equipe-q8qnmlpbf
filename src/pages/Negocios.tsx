import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Plus, MoreHorizontal, AlertCircle } from 'lucide-react'
import { mockDeals, DealStatus } from '@/lib/mock-data'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useToast } from '@/hooks/use-toast'

const COLUMNS: DealStatus[] = ['Prospecção', 'Qualificação', 'Proposta', 'Negociação', 'Fechado']

export default function Negocios() {
  const [deals, setDeals] = useState(mockDeals)
  const { toast } = useToast()

  const handleDragStart = (e: React.DragEvent, dealId: string) => {
    e.dataTransfer.setData('dealId', dealId)
  }

  const handleDrop = (e: React.DragEvent, status: DealStatus) => {
    const dealId = e.dataTransfer.getData('dealId')
    const deal = deals.find((d) => d.id === dealId)

    if (deal && deal.status !== status) {
      setDeals(deals.map((d) => (d.id === dealId ? { ...d, status } : d)))
      toast({
        title: 'Negócio atualizado',
        description: `"${deal.name}" movido para ${status}.`,
        duration: 3000,
      })
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
  }

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Negócios</h1>
          <p className="text-muted-foreground">
            Arraste os cards para atualizar o status do pipeline.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Novo Negócio
        </Button>
      </div>

      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex h-full gap-4 min-w-max">
          {COLUMNS.map((col) => {
            const colDeals = deals.filter((d) => d.status === col)
            const colTotal = colDeals.reduce((acc, curr) => acc + curr.value, 0)

            return (
              <div
                key={col}
                className="flex flex-col w-[300px] shrink-0 bg-muted/30 rounded-xl border p-2"
                onDrop={(e) => handleDrop(e, col)}
                onDragOver={handleDragOver}
              >
                <div className="flex items-center justify-between p-2 mb-2">
                  <h3 className="font-semibold text-sm">
                    {col}{' '}
                    <span className="text-muted-foreground ml-1 font-normal">
                      ({colDeals.length})
                    </span>
                  </h3>
                  <span className="text-xs font-medium bg-muted px-2 py-1 rounded text-muted-foreground">
                    {formatCurrency(colTotal)}
                  </span>
                </div>

                <div className="flex-1 overflow-y-auto flex flex-col gap-3 min-h-[150px]">
                  {colDeals.map((deal) => (
                    <Card
                      key={deal.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, deal.id)}
                      className={`cursor-grab active:cursor-grabbing hover:border-primary/50 transition-colors ${deal.stagnant ? 'border-warning' : ''}`}
                    >
                      <CardContent className="p-3">
                        {deal.stagnant && (
                          <div className="flex items-center text-warning text-xs font-medium mb-2">
                            <AlertCircle className="w-3 h-3 mr-1" /> Estagnado
                          </div>
                        )}
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-sm leading-tight line-clamp-2">
                            {deal.name}
                          </h4>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 -mr-2 -mt-2 shrink-0"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">{deal.company}</p>
                        <div className="flex items-center justify-between mt-auto">
                          <span className="font-medium text-sm">{formatCurrency(deal.value)}</span>
                          <Avatar className="h-6 w-6 border">
                            <AvatarImage
                              src={`https://img.usecurling.com/ppl/thumbnail?seed=${deal.avatar}`}
                            />
                            <AvatarFallback>{deal.owner[0]}</AvatarFallback>
                          </Avatar>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {colDeals.length === 0 && (
                    <div className="h-full flex items-center justify-center border-2 border-dashed border-muted rounded-lg p-4 text-center">
                      <p className="text-sm text-muted-foreground">Solte negócios aqui</p>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
