import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, Calculator, Shield, Clock } from "lucide-react"

const emiFeatures = [
  {
    icon: CreditCard,
    title: "Easy EMI",
    description: "Convert your purchase into easy monthly installments",
  },
  {
    icon: Calculator,
    title: "EMI Calculator",
    description: "Calculate your monthly payments before purchase",
  },
  {
    icon: Shield,
    title: "Secure Process",
    description: "Safe and secure EMI processing with trusted banks",
  },
  {
    icon: Clock,
    title: "Quick Approval",
    description: "Get instant EMI approval in minutes",
  },
]

export function EMIHighlight() {
  return (
    <section className="py-16 bg-gradient-to-r from-secondary/10 to-accent/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Easy EMI Options</h2>
          <p className="text-lg text-muted-foreground mb-6">Shop now, pay later with our flexible EMI plans</p>
          <div className="text-center">
            <span className="text-2xl font-bold text-primary">0% Interest</span>
            <span className="text-lg text-muted-foreground ml-2">on selected products</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {emiFeatures.map((feature) => (
            <Card key={feature.title} className="glass-card text-center">
              <CardContent className="p-6">
                <div className="mb-4">
                  <feature.icon className="h-12 w-12 mx-auto text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="mr-4">
            Learn More About EMI
          </Button>
          <Button variant="outline" size="lg">
            EMI Calculator
          </Button>
        </div>
      </div>
    </section>
  )
}
