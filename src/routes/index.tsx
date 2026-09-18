import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  BatteryCharging,
  BookOpen,
  CalendarCheck,
  Check,
  ChevronDown,
  CircleCheck,
  Dumbbell,
  Flame,
  Heart,
  ListChecks,
  LockKeyhole,
  Medal,
  Play,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Target,
  Timer,
  Utensils,
  Zap,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import ebookCover from "@/assets/metodo-secar-capa.jpg";

const CHECKOUT_URL = "[COLOCAR LINK DO CHECKOUT]";
const PRICE = "5.600 Kz";
const OLD_PRICE = "12.500 Kz";
const OFFER_SECONDS = 5 * 60 + 30;

function useOfferCountdown() {
  const [secondsLeft, setSecondsLeft] = useState(OFFER_SECONDS);
  useEffect(() => {
    const interval = window.setInterval(() => setSecondsLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => window.clearInterval(interval);
  }, []);
  const minutes = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const seconds = String(secondsLeft % 60).padStart(2, "0");
  return { expired: secondsLeft === 0, time: `${minutes}:${seconds}` };
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Método Secar em 20 Dias — E-book Digital" },
      {
        name: "description",
        content:
          "Um plano prático de 20 dias para organizar alimentação, movimento e hábitos com mais consistência.",
      },
      { property: "og:title", content: "Método Secar em 20 Dias" },
      {
        property: "og:description",
        content: "Organize a sua rotina e dê o primeiro passo com um método prático e possível de seguir.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SalesPage,
});

const problems = [
  "Gordura abdominal que incomoda",
  "Falta de disciplina",
  "Dietas difíceis de manter",
  "Começar e desistir",
  "Vergonha de determinadas roupas",
  "Falta de energia e confiança",
];

const contents = [
  [CalendarCheck, "Organização da rotina"],
  [Utensils, "Estratégias alimentares práticas"],
  [Dumbbell, "Exercícios e movimento"],
  [ListChecks, "Hábitos que ajudam na consistência"],
  [Target, "Como evitar erros comuns"],
  [Zap, "Como manter o foco durante o processo"],
  [Medal, "Estratégias para não desistir"],
] as const;

const benefits = [
  { icon: Flame, title: "Foco na redução de gordura", text: "Orientações para alinhar alimentação, movimento e rotina em torno do seu objectivo." },
  { icon: Dumbbell, title: "Corpo mais activo e definido", text: "Movimentos simples para estimular o corpo sem exigir aparelhos sofisticados." },
  { icon: BatteryCharging, title: "Mais energia no dia a dia", text: "Hábitos organizados para deixar de viver no improviso e cuidar melhor de si." },
  { icon: Heart, title: "Confiança que nasce da acção", text: "A satisfação de cumprir um plano possível e voltar a levar o seu objectivo a sério." },
];

const bonuses = [
  ["01", "PLANEADOR DE REFEIÇÕES", "Organize antecipadamente as suas refeições, lista de compras e horários para reduzir escolhas por impulso."],
  ["02", "DESAFIO 20 DIAS", "Um calendário diário para assinalar alimentação, água, movimento e hábitos — e visualizar a sua consistência."],
  ["03", "GUIA DE TREINO EM CASA", "Uma rotina simples e progressiva para movimentar o corpo em casa, mesmo sem equipamentos sofisticados."],
  ["04", "PROTOCOLO ANTI-DESISTÊNCIA", "Acções rápidas para recuperar o foco depois de um dia difícil, sem abandonar todo o processo."],
];

const faqs = [
  ["O que vou receber?", "O e-book Método Secar em 20 Dias e os quatro materiais de bónus apresentados nesta página."],
  ["É um e-book digital?", "Sim. Todo o conteúdo é digital e fica disponível para leitura após a confirmação da compra."],
  ["Posso ler pelo telemóvel?", "Sim. Pode ler confortavelmente no telemóvel, tablet ou computador."],
  ["Para quem é o Método Secar em 20 Dias?", "Para quem quer organizar alimentação, movimento e hábitos com um plano simples e orientado."],
  ["Preciso de equipamentos?", "Não. O guia inclui movimentos simples que podem ser adaptados para fazer em casa."],
  ["Como recebo o acesso?", "O acesso digital é enviado após a confirmação do pagamento, conforme as instruções do checkout."],
  ["Existe garantia?", "Sim. Terá 7 dias para conhecer o material, respeitando as condições indicadas no checkout."],
  ["O método garante que vou perder peso?", "Não. Resultados variam de pessoa para pessoa e dependem de diversos factores. O material oferece orientação prática para ajudar na construção de hábitos e rotina."],
];

function PurchaseButton({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <Button asChild size="lg" className={`h-14 w-full rounded-md px-6 text-sm font-black uppercase shadow-[0_10px_30px_var(--cta-shadow)] sm:w-auto sm:text-base ${className}`}>
      <a href={CHECKOUT_URL}>
        {children}
        <ArrowRight aria-hidden="true" />
      </a>
    </Button>
  );
}

function OfferPrice() {
  const { expired, time } = useOfferCountdown();

  if (expired) {
    return (
      <div className="mt-7 border-l-4 border-primary pl-5">
        <p className="text-xs font-bold uppercase text-muted-foreground">Receba todo o material por</p>
        <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="font-display text-5xl font-black text-primary sm:text-6xl">{OLD_PRICE}</span>
        </div>
        <p className="mt-2 text-xs font-bold uppercase text-muted-foreground">Preço normal do método</p>
      </div>
    );
  }

  return (
    <div className="mt-7 border-l-4 border-primary pl-5">
      <p className="text-xs font-bold uppercase text-muted-foreground">Receba todo o material por</p>
      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
        <span className="font-display text-5xl font-black text-primary sm:text-6xl">{PRICE}</span>
        <span className="text-2xl font-bold text-muted-foreground line-through decoration-warning decoration-2">{OLD_PRICE}</span>
        <span className="rounded-full bg-warning px-3 py-1 text-xs font-black uppercase text-warning-foreground">Oferta de lançamento</span>
      </div>
      <p className="mt-2 text-xs font-bold uppercase text-warning">Economiza 6.900 Kz ao comprar hoje</p>
      <div className="mt-4 flex flex-wrap items-center gap-3 border border-warning/50 bg-warning/10 p-4">
        <Timer className="size-6 shrink-0 text-warning" aria-hidden="true" />
        <p className="text-xs font-black uppercase sm:text-sm">
          Esta oferta termina em <span className="font-display text-base text-warning tabular-nums sm:text-lg">{time}</span>
        </p>
        <p className="w-full text-[11px] font-bold uppercase text-muted-foreground">Depois deste tempo, o preço volta ao valor normal de {OLD_PRICE}.</p>
      </div>
    </div>
  );
}

function EbookCover({ priority = false }: { priority?: boolean }) {
  return (
    <div className="relative mx-auto w-full max-w-[320px] perspective-distant" aria-label="Capa oficial do e-book Método Secar em 20 Dias">
      <img
        src={ebookCover}
        alt="Capa oficial do e-book Método Secar em 20 Dias"
        width={1024}
        height={1536}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        className="ebook-cover block aspect-[2/3] w-full border border-primary/40 object-cover shadow-2xl"
      />
      <div className="mx-auto mt-5 flex w-fit items-center gap-2 text-xs font-bold uppercase text-muted-foreground">
        <Smartphone className="size-4 text-primary" /> Leitura no telemóvel
      </div>
    </div>
  );
}

function SalesPage() {
  return (
    <main className="overflow-hidden bg-background pb-20 text-foreground md:pb-0">
      <section className="relative isolate min-h-[92svh] border-b border-border">
        <div className="hero-grid absolute inset-0 -z-10 opacity-40" />
        <div className="mx-auto grid min-h-[92svh] max-w-6xl items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.15fr_.85fr] lg:py-20">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 border border-primary/40 bg-primary/10 px-3 py-2 text-xs font-extrabold uppercase text-primary">
              <Play className="size-3 fill-current" /> Plano prático de 20 dias
            </div>
            <h1 className="font-display max-w-3xl text-5xl font-black uppercase leading-[.88] sm:text-7xl lg:text-8xl">
              Método <span className="text-primary">Secar</span> em 20 Dias
            </h1>
            <h2 className="mt-6 max-w-2xl text-xl font-bold leading-tight sm:text-3xl">
              Pare de começar dietas que você abandona poucos dias depois.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Descubra um método prático para organizar a sua alimentação, os seus hábitos e a sua rotina de movimento, ajudando a trabalhar na redução de gordura e na definição do corpo sem planos complicados.
            </p>
            <div className="mt-8">
              <PurchaseButton>Quero começar agora</PurchaseButton>
              <p className="mt-3 flex items-center gap-2 text-xs font-black uppercase text-muted-foreground"><Zap className="size-4 text-warning" /> Acesso digital imediato</p>
            </div>
          </div>
          <EbookCover priority />
        </div>
      </section>

      <section className="bg-foreground py-20 text-background">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <p className="section-kicker">Reconhece este ciclo?</p>
          <h2 className="section-title max-w-4xl">Você está cansada de olhar para o espelho e sentir que o seu corpo não acompanha a pessoa que quer ser?</h2>
          <div className="mt-10 grid gap-px overflow-hidden border border-background/15 bg-background/15 sm:grid-cols-2 lg:grid-cols-3">
            {problems.map((problem) => (
              <div key={problem} className="flex min-h-24 items-center gap-3 bg-foreground p-5 font-bold">
                <span className="flex size-8 shrink-0 items-center justify-center bg-primary/15 text-primary"><Check className="size-5" /></span>{problem}
              </div>
            ))}
          </div>
          <p className="mt-10 max-w-3xl border-l-4 border-primary pl-5 text-lg font-semibold leading-relaxed sm:text-2xl">
            Você não precisa continuar presa ao ciclo de começar, desistir e começar novamente. O primeiro passo é ter um plano simples que consiga realmente seguir.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="max-w-3xl">
            <p className="section-kicker">Uma direcção clara</p>
            <h2 className="section-title">Conheça o Método Secar em 20 Dias</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">O e-book apresenta uma rotina estruturada com orientações práticas sobre alimentação, organização, exercícios, movimento e hábitos que ajudam a tornar o processo mais consistente.</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(({ icon: Icon, title, text }) => (
              <div key={title} className="border border-border bg-card p-6">
                <Icon className="mb-8 size-8 text-primary" />
                <h3 className="text-lg font-black uppercase leading-tight">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs text-muted-foreground">Os resultados variam de pessoa para pessoa e dependem de diversos factores.</p>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/40 py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <p className="section-kicker">Conteúdo prático</p>
          <h2 className="section-title">O que você vai encontrar no e-book</h2>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {contents.map(([Icon, title], index) => (
              <div key={title} className={`flex min-h-28 items-center gap-5 border border-border bg-background p-5 ${index === contents.length - 1 ? "lg:col-start-2" : ""}`}>
                <span className="flex size-12 shrink-0 items-center justify-center bg-primary text-primary-foreground"><Icon className="size-6" /></span>
                <h3 className="font-bold leading-tight">{title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
          <EbookCover />
          <div>
            <p className="section-kicker">Tudo o que precisa para começar</p>
            <h2 className="section-title">Um plano completo para sair da intenção e entrar em acção.</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">Em vez de juntar conselhos soltos, recebe uma sequência clara para organizar os próximos 20 dias com mais foco, consciência e consistência.</p>
            <ul className="mt-7 grid gap-3 text-sm font-bold sm:grid-cols-2">
              {["E-book Método Secar em 20 Dias", "Acesso digital", "Leitura no telemóvel", "Conteúdo prático", "Bónus exclusivos"].map((item) => <li key={item} className="flex gap-2"><CircleCheck className="size-5 shrink-0 text-primary" />{item}</li>)}
            </ul>
            <div className="mt-8 flex items-center gap-3 border border-primary/35 bg-primary/10 p-4 text-sm font-extrabold uppercase"><Sparkles className="size-5 shrink-0 text-primary" /> E-book completo + 4 bónus práticos</div>
            <OfferPrice />
            <div className="mt-7"><PurchaseButton>Quero o método agora</PurchaseButton></div>
            <p className="mt-4 flex items-center gap-2 text-xs font-bold text-muted-foreground"><LockKeyhole className="size-4 text-primary" /> Pagamento seguro e acesso digital após confirmação</p>
          </div>
        </div>
      </section>

      <section className="bg-foreground py-20 text-background">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div><p className="section-kicker">Mais valor para avançar</p><h2 className="section-title">E ainda vai receber estes bónus</h2></div>
            <div className="w-fit bg-warning px-4 py-3 text-sm font-black uppercase text-warning-foreground">4 bónus + e-book completo</div>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {bonuses.map(([number, title, text]) => (
              <div key={number} className="border border-background/15 p-6 sm:p-8">
                <div className="mb-8 flex items-center justify-between"><span className="font-display text-4xl font-black text-primary">{number}</span><Sparkles className="size-6 text-warning" /></div>
                <p className="mb-2 text-[11px] font-black uppercase text-warning">Incluído sem custo adicional</p><h3 className="text-lg font-black">{title}</h3><p className="mt-3 leading-relaxed text-background/65">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <p className="section-kicker justify-center">Leve o seu objectivo a sério</p>
          <h2 className="section-title">Imagine olhar para o espelho e perceber que finalmente está a levar o seu objectivo a sério.</h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">Imagine vestir aquela roupa de que gosta com mais confiança. Sentir-se mais disposta. Ter uma rotina organizada. E, principalmente, parar de depender de promessas milagrosas e começar a trabalhar consistentemente pelos resultados que deseja.</p>
          <div className="mt-9 flex justify-center"><PurchaseButton>Quero começar os 20 dias</PurchaseButton></div>
        </div>
      </section>

      <section className="border-y border-border bg-secondary/40 py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <p className="section-kicker">Sem complicações</p><h2 className="section-title">Talvez esteja a pensar…</h2>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {[
              ["E se eu não tiver tempo?", "O método é apresentado de forma prática para se encaixar na rotina."],
              ["E se eu estiver a começar agora?", "O conteúdo foi estruturado para quem precisa de orientação e organização."],
              ["E se eu já tentei várias vezes?", "O foco é criar consistência e hábitos sustentáveis, não depender apenas de motivação."],
            ].map(([q, a]) => <div key={q} className="border-t-4 border-primary bg-background p-6"><h3 className="text-lg font-black">{q}</h3><p className="mt-4 leading-relaxed text-muted-foreground">{a}</p></div>)}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-5xl gap-8 px-5 sm:px-8 md:grid-cols-[auto_1fr] md:items-center">
          <div className="flex size-36 items-center justify-center border-2 border-primary bg-primary/10 text-primary"><ShieldCheck className="size-20" /></div>
          <div><p className="section-kicker">Conheça primeiro. Decida com tranquilidade.</p><h2 className="section-title">7 dias de garantia de satisfação</h2><p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">Faça a compra, receba o material e conheça o método com calma. Se, dentro de 7 dias, perceber que este conteúdo não é adequado para si, poderá solicitar o reembolso conforme as condições apresentadas no checkout.</p><div className="mt-6 flex flex-wrap gap-3"><p className="inline-flex items-center gap-2 border border-border px-4 py-3 text-sm font-black uppercase"><LockKeyhole className="size-5 text-primary" /> Compra segura</p><p className="inline-flex items-center gap-2 border border-border px-4 py-3 text-sm font-black uppercase"><ShieldCheck className="size-5 text-primary" /> Decisão sem pressão</p></div></div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8">
        <div className="mx-auto max-w-5xl border border-primary/40 bg-primary/10 p-7 text-center sm:p-12"><p className="font-display text-4xl font-black uppercase sm:text-5xl">Comece hoje</p><p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">Quanto mais você adia, mais um dia passa sem começar. Tenha acesso ao material e comece a colocar o método em prática hoje.</p></div>
      </section>

      <section className="border-y border-border bg-secondary/40 py-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <p className="section-kicker">Perguntas frequentes</p><h2 className="section-title">Tudo o que precisa saber</h2>
          <div className="mt-9 divide-y divide-border border-y border-border">
            {faqs.map(([q, a]) => <details key={q} className="group"><summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 font-bold"><span>{q}</span><ChevronDown className="size-5 shrink-0 text-primary transition-transform group-open:rotate-180" /></summary><p className="max-w-3xl pb-6 leading-relaxed text-muted-foreground">{a}</p></details>)}
          </div>
        </div>
      </section>

      <section className="bg-foreground py-20 text-center text-background sm:py-28">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <BadgeCheck className="mx-auto mb-6 size-10 text-primary" /><h2 className="section-title">O seu próximo passo começa agora.</h2><p className="mx-auto mt-5 max-w-2xl text-lg text-background/65">Não espere pela próxima segunda-feira. Comece hoje a organizar a sua rotina e a trabalhar pelo corpo e pela confiança que deseja construir.</p>
          <div className="mt-9 flex justify-center"><PurchaseButton>Quero o meu acesso agora</PurchaseButton></div>
          <p className="mt-5 text-xs font-bold uppercase text-background/70">🔒 Compra segura&nbsp; • &nbsp;📲 Acesso digital&nbsp; • &nbsp;🇦🇴 Pagamento em Kz</p>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 p-3 backdrop-blur md:hidden">
        <PurchaseButton className="h-12">Quero começar agora</PurchaseButton>
      </div>
    </main>
  );
}