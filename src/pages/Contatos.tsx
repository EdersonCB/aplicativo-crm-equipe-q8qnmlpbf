import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Plus, Phone, Mail, Filter } from 'lucide-react'
import { mockContacts } from '@/lib/mock-data'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function Contatos() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedContact, setSelectedContact] = useState<(typeof mockContacts)[0] | null>(null)

  const filteredContacts = mockContacts.filter(
    (c) =>
      c.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.empresa.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Cliente':
        return 'bg-success text-success-foreground'
      case 'Lead':
        return 'bg-primary text-primary-foreground'
      case 'Prospect':
        return 'bg-warning text-warning-foreground'
      default:
        return 'bg-secondary text-secondary-foreground'
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Contatos</h1>
          <p className="text-muted-foreground">Gerencie sua lista de clientes e leads.</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Novo Contato
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar por nome ou empresa..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" className="ml-2">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Empresa</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead>Telefone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Último Contato</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContacts.map((contact) => (
                  <TableRow
                    key={contact.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => setSelectedContact(contact)}
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={`https://img.usecurling.com/ppl/thumbnail?seed=${contact.id}`}
                          />
                          <AvatarFallback>{contact.nome.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        {contact.nome}
                      </div>
                    </TableCell>
                    <TableCell>{contact.empresa}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{contact.telefone}</TableCell>
                    <TableCell>
                      <Badge className={`border-transparent ${getStatusColor(contact.status)}`}>
                        {contact.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {contact.ultimoContato}
                    </TableCell>
                  </TableRow>
                ))}
                {filteredContacts.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                      Nenhum contato encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Sheet open={!!selectedContact} onOpenChange={(open) => !open && setSelectedContact(null)}>
        <SheetContent className="sm:max-w-md w-full p-0 flex flex-col h-full border-l">
          {selectedContact && (
            <>
              <SheetHeader className="p-6 pb-0 border-b">
                <div className="flex items-start gap-4 mb-6">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={`https://img.usecurling.com/ppl/thumbnail?seed=${selectedContact.id}`}
                    />
                    <AvatarFallback>{selectedContact.nome.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <SheetTitle className="text-2xl">{selectedContact.nome}</SheetTitle>
                    <SheetDescription className="text-base">
                      {selectedContact.empresa}
                    </SheetDescription>
                    <Badge
                      className={`mt-2 border-transparent ${getStatusColor(selectedContact.status)}`}
                    >
                      {selectedContact.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2 pb-6">
                  <Button variant="outline" className="flex-1">
                    <Phone className="mr-2 h-4 w-4" /> Ligar
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Mail className="mr-2 h-4 w-4" /> E-mail
                  </Button>
                </div>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold mb-2 uppercase text-muted-foreground tracking-wider">
                      Detalhes de Contato
                    </h4>
                    <div className="grid gap-2 text-sm">
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">E-mail</span>
                        <span className="font-medium">{selectedContact.email}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Telefone</span>
                        <span className="font-medium">{selectedContact.telefone}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="text-muted-foreground">Último Contato</span>
                        <span className="font-medium">{selectedContact.ultimoContato}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-3 uppercase text-muted-foreground tracking-wider">
                      Histórico Recente
                    </h4>
                    <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                      <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                        <div className="flex items-center justify-center w-4 h-4 rounded-full border border-primary bg-background shrink-0 ml-0 md:mx-auto z-10"></div>
                        <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1rem)] p-3 rounded border bg-card shadow-sm">
                          <p className="text-xs text-muted-foreground mb-1">Há 2 dias</p>
                          <p className="text-sm font-medium">Ligação de Prospecção</p>
                          <p className="text-xs mt-1 text-muted-foreground">
                            Cliente demonstrou interesse na nova linha de produtos.
                          </p>
                        </div>
                      </div>
                      <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                        <div className="flex items-center justify-center w-4 h-4 rounded-full border border-muted-foreground bg-background shrink-0 ml-0 md:mx-auto z-10"></div>
                        <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1rem)] p-3 rounded border bg-card shadow-sm opacity-70">
                          <p className="text-xs text-muted-foreground mb-1">Há 15 dias</p>
                          <p className="text-sm font-medium">E-mail de Apresentação</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}
