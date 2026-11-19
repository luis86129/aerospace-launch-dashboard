import { useMemo, useState } from "react";
import {
  Activity,
  ArrowUpRight,
  Box,
  CalendarDays,
  ChevronDown,
  CircleDot,
  Clock3,
  MapPin,
  Orbit,
  Rocket,
  Satellite,
  ShieldCheck,
  Sparkles,
  Weight,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  agencyShare,
  launchSummary,
  launches,
  missionOutcome,
  yearlyLaunches,
} from "./data/internetUsageData";

const chartTooltipStyle = {
  backgroundColor: "#101a2c",
  border: "1px solid #26344d",
  borderRadius: "10px",
  color: "#f7f9fc",
  boxShadow: "0 16px 40px rgba(0,0,0,.35)",
};

function StatusBadge({ status }: { status: string }) {
  const isSuccess = status === "Success";
  const isUpcoming = status === "Go for Launch";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wider ${
        isSuccess
          ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
          : isUpcoming
            ? "border-sky-400/20 bg-sky-400/10 text-sky-300"
            : "border-rose-400/20 bg-rose-400/10 text-rose-300"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isSuccess ? "bg-emerald-300" : isUpcoming ? "bg-sky-300" : "bg-rose-300"
        }`}
      />
      {status}
    </span>
  );
}

function MetricCard({
  eyebrow,
  value,
  detail,
  icon: Icon,
  accent,
}: {
  eyebrow: string;
  value: string;
  detail: string;
  icon: typeof Rocket;
  accent: "lime" | "blue" | "violet";
}) {
  const accents = {
    lime: {
      icon: "bg-[#c7ff4a]/10 text-[#c7ff4a] border-[#c7ff4a]/20",
      line: "bg-[#c7ff4a]",
    },
    blue: {
      icon: "bg-sky-400/10 text-sky-300 border-sky-400/20",
      line: "bg-sky-400",
    },
    violet: {
      icon: "bg-violet-400/10 text-violet-300 border-violet-400/20",
      line: "bg-violet-400",
    },
  };

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111b2e]/80 p-5 shadow-[0_20px_70px_rgba(0,0,0,.18)] backdrop-blur transition-colors hover:border-white/[0.14]">
      <span className={`absolute inset-x-0 top-0 h-px ${accents[accent].line}`} />
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
            {eyebrow}
          </p>
          <p className="mt-3 font-display text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
            {value}
          </p>
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${accents[accent].icon}`}>
          <Icon size={18} strokeWidth={1.8} />
        </div>
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
        {accent === "lime" && <ArrowUpRight size={13} className="text-[#c7ff4a]" />}
        {detail}
      </p>
    </article>
  );
}

function SectionHeader({
  index,
  title,
  detail,
}: {
  index: string;
  title: string;
  detail: string;
}) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-slate-500">
          {index} / Telemetría
        </p>
        <h2 className="mt-1.5 font-display text-base font-semibold tracking-tight text-slate-100">
          {title}
        </h2>
      </div>
      <p className="hidden font-mono text-[9px] uppercase tracking-[0.16em] text-slate-600 sm:block">
        {detail}
      </p>
    </div>
  );
}

export default function App() {
  const [provider, setProvider] = useState("Todos los Proveedores");
  const [status, setStatus] = useState("Todos los Estados");

  const providers = ["Todos los Proveedores", "SpaceX", "NASA", "ESA", "ISRO", "CASC"];
  const statuses = ["Todos los Estados", "Success", "Failure", "Go for Launch"];

  const filteredLaunches = useMemo(
    () =>
      launches.filter(
        (launch) =>
          (provider === "Todos los Proveedores" || launch.provider === provider) &&
          (status === "Todos los Estados" || launch.status === status),
      ),
    [provider, status],
  );

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-[#c7ff4a] selection:text-[#07101f]">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -right-32 -top-40 h-[36rem] w-[36rem] rounded-full bg-sky-500/[0.07] blur-[110px]" />
        <div className="absolute -left-24 top-[38rem] h-80 w-80 rounded-full bg-violet-500/[0.05] blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.5)_1px,transparent_1px)] [background-size:64px_64px]" />
      </div>

      <header className="relative border-b border-white/[0.07]">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
          <div className="flex items-center gap-3.5">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-[#c7ff4a]/25 bg-[#c7ff4a]/10 text-[#c7ff4a]">
              <Rocket size={20} />
              <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-[#c7ff4a] shadow-[0_0_12px_#c7ff4a]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-lg font-semibold tracking-[-0.03em] text-white sm:text-xl">
                  Space Launch Analytics
                </h1>
                <span className="hidden rounded border border-white/10 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-widest text-slate-500 sm:inline">
                  LLAPI
                </span>
              </div>
              <p className="mt-0.5 text-[11px] text-slate-500">
                Monitoreo global de lanzamientos aeroespaciales
              </p>
            </div>
          </div>
          <div className="hidden items-center gap-5 md:flex">
            <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              DAWM
            </div>
            <div className="h-7 w-px bg-white/10" />
            <p className="font-mono text-[10px] text-slate-400">UTC 14:32:08</p>
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-[1440px] px-5 pb-12 pt-7 sm:px-8 lg:px-12">
        <section className="mb-7 flex flex-col justify-between gap-5 border-b border-white/[0.07] pb-7 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.24em] text-[#c7ff4a]">
              <Orbit size={13} />
              Centro de control orbital
            </div>
            <h2 className="font-display text-3xl font-semibold leading-[1.05] tracking-[-0.045em] text-white sm:text-4xl">
              Inteligencia de misión,
              <span className="block text-slate-500">en una sola trayectoria.</span>
            </h2>
          </div>

          <div className="grid w-full gap-3 sm:grid-cols-2 lg:w-auto lg:min-w-[520px]">
            <label className="group">
              <span className="mb-2 block font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500">
                01 — Proveedor
              </span>
              <div className="relative">
                <select
                  value={provider}
                  onChange={(event) => setProvider(event.target.value)}
                  className="h-11 w-full appearance-none rounded-xl border border-white/10 bg-[#111b2e] px-4 pr-10 text-xs text-slate-200 outline-none transition-colors hover:border-white/20 focus:border-[#c7ff4a]/50 focus:ring-2 focus:ring-[#c7ff4a]/10"
                >
                  {providers.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3.5 top-3.5 text-slate-500" size={15} />
              </div>
            </label>
            <label className="group">
              <span className="mb-2 block font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500">
                02 — Estado de misión
              </span>
              <div className="relative">
                <select
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                  className="h-11 w-full appearance-none rounded-xl border border-white/10 bg-[#111b2e] px-4 pr-10 text-xs text-slate-200 outline-none transition-colors hover:border-white/20 focus:border-[#c7ff4a]/50 focus:ring-2 focus:ring-[#c7ff4a]/10"
                >
                  {statuses.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3.5 top-3.5 text-slate-500" size={15} />
              </div>
            </label>
          </div>
        </section>

        <section className="mb-7 grid gap-4 md:grid-cols-3">
          <MetricCard
            eyebrow="Total lanzamientos"
            value={launchSummary.total.toLocaleString("en-US")}
            detail="+12% este mes"
            icon={Rocket}
            accent="lime"
          />
          <MetricCard
            eyebrow="Tasa de éxito"
            value={`${launchSummary.successRate}%`}
            detail={`${launchSummary.successful.toLocaleString("en-US")} misiones exitosas`}
            icon={ShieldCheck}
            accent="blue"
          />
          <MetricCard
            eyebrow="Carga transportada"
            value={`${launchSummary.payload.toLocaleString("en-US")} t`}
            detail={`Promedio: ${launchSummary.averagePayload}t por cohete`}
            icon={Weight}
            accent="violet"
          />
        </section>

        <section className="mb-7 grid gap-4 xl:grid-cols-[1.45fr_.8fr_.8fr]">
          <article className="rounded-2xl border border-white/[0.08] bg-[#0d1729]/75 p-5 sm:p-6">
            <SectionHeader index="01" title="Lanzamientos por año" detail="2022 — 2025" />
            <div className="h-[270px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={yearlyLaunches} margin={{ top: 12, right: 6, left: -22, bottom: 0 }}>
                  <defs key="launch-gradient">
                    <linearGradient id="launchArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#c7ff4a" stopOpacity={0.28} />
                      <stop offset="95%" stopColor="#c7ff4a" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid key="launch-grid" stroke="#26344d" strokeOpacity={0.6} vertical={false} />
                  <XAxis
                    key="launch-x"
                    dataKey="year"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6f7d95", fontSize: 10, fontFamily: "DM Mono" }}
                    dy={10}
                  />
                  <YAxis
                    key="launch-y"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6f7d95", fontSize: 10, fontFamily: "DM Mono" }}
                  />
                  <Tooltip
                    key="launch-tooltip"
                    cursor={{ stroke: "#c7ff4a", strokeOpacity: 0.2 }}
                    contentStyle={chartTooltipStyle}
                    itemStyle={{ color: "#c7ff4a" }}
                    labelStyle={{ color: "#94a3b8", marginBottom: 4 }}
                    formatter={(value: number) => [`${value} misiones`, "Lanzamientos"]}
                  />
                  <Area
                    key="launch-area"
                    type="monotone"
                    dataKey="launches"
                    stroke="#c7ff4a"
                    strokeWidth={2.5}
                    fill="url(#launchArea)"
                    dot={{ fill: "#0d1729", stroke: "#c7ff4a", strokeWidth: 2, r: 4 }}
                    activeDot={{ fill: "#c7ff4a", stroke: "#0d1729", strokeWidth: 3, r: 6 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </article>

          <article className="rounded-2xl border border-white/[0.08] bg-[#0d1729]/75 p-5 sm:p-6">
            <SectionHeader index="02" title="Cuota por agencia" detail="Global" />
            <div className="relative h-[185px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    key="agency-pie"
                    data={agencyShare}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={52}
                    outerRadius={78}
                    paddingAngle={4}
                    stroke="none"
                  >
                    {agencyShare.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    key="agency-tooltip"
                    contentStyle={chartTooltipStyle}
                    formatter={(value: number) => [`${value}%`, "Cuota"]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <Satellite size={18} className="mb-1 text-slate-500" />
                <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500">Share</span>
              </div>
            </div>
            <div className="space-y-2.5">
              {agencyShare.map((agency) => (
                <div key={agency.name} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-slate-400">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: agency.color }} />
                    {agency.name}
                  </span>
                  <span className="font-mono text-[11px] text-slate-200">{agency.value}%</span>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-white/[0.08] bg-[#0d1729]/75 p-5 sm:p-6">
            <SectionHeader index="03" title="Éxito vs. fallo" detail="Acumulado" />
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={missionOutcome} margin={{ top: 15, right: 4, left: 4, bottom: 0 }}>
                  <XAxis
                    key="outcome-x"
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6f7d95", fontSize: 10, fontFamily: "DM Mono" }}
                  />
                  <YAxis key="outcome-y" hide />
                  <Tooltip
                    key="outcome-tooltip"
                    cursor={{ fill: "rgba(255,255,255,.025)" }}
                    contentStyle={chartTooltipStyle}
                    formatter={(value: number) => [value.toLocaleString("en-US"), "Misiones"]}
                  />
                  <Bar key="outcome-bars" dataKey="value" radius={[7, 7, 2, 2]} barSize={48}>
                    {missionOutcome.map((item) => (
                      <Cell key={item.name} fill={item.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 border-t border-white/[0.07] pt-4">
              {missionOutcome.map((item) => (
                <div key={item.name}>
                  <p className="font-display text-xl font-semibold text-white">
                    {item.value.toLocaleString("en-US")}
                  </p>
                  <p className="mt-0.5 text-[10px] text-slate-500">{item.name}</p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d1729]/75">
          <div className="flex flex-col gap-3 border-b border-white/[0.07] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>
              <div className="flex items-center gap-2">
                <Activity size={15} className="text-[#c7ff4a]" />
                <h2 className="font-display text-base font-semibold text-white">
                  Lanzamientos detallados
                </h2>
              </div>
              <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500">
                Registro de misiones / NET
              </p>
            </div>
            <div className="flex items-center gap-2">
              {(provider !== "Todos los Proveedores" || status !== "Todos los Estados") && (
                <button
                  onClick={() => {
                    setProvider("Todos los Proveedores");
                    setStatus("Todos los Estados");
                  }}
                  className="rounded-lg border border-white/10 px-3 py-2 text-[10px] text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
                >
                  Limpiar filtros
                </button>
              )}
              <span className="rounded-lg bg-white/[0.04] px-3 py-2 font-mono text-[9px] uppercase tracking-wider text-slate-500">
                {filteredLaunches.length} resultados
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] border-collapse">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {["Misión", "Proveedor", "Fecha (NET)", "Ubicación", "Estado"].map((heading) => (
                    <th
                      key={heading}
                      className="px-6 py-3.5 text-left font-mono text-[9px] font-medium uppercase tracking-[0.18em] text-slate-600"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredLaunches.map((launch) => (
                  <tr key={launch.mission} className="group border-b border-white/[0.05] last:border-0 hover:bg-white/[0.025]">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-slate-500 transition-colors group-hover:border-[#c7ff4a]/20 group-hover:text-[#c7ff4a]">
                          <Rocket size={14} />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-slate-200">{launch.mission}</p>
                          <p className="mt-0.5 font-mono text-[9px] text-slate-600">{launch.code}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-400">
                      <span className="inline-flex items-center gap-2">
                        <CircleDot size={12} className="text-slate-600" />
                        {launch.provider}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-2 font-mono text-[10px] text-slate-400">
                        <CalendarDays size={12} className="text-slate-600" />
                        {launch.date}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-2 text-xs text-slate-400">
                        <MapPin size={12} className="text-slate-600" />
                        {launch.location}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={launch.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredLaunches.length === 0 && (
              <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
                <Box size={24} className="text-slate-600" />
                <p className="mt-3 text-sm text-slate-300">No hay misiones con estos filtros</p>
                <p className="mt-1 text-xs text-slate-600">Prueba otra combinación de proveedor y estado.</p>
              </div>
            )}
          </div>
        </section>

        <footer className="mt-7 flex flex-col gap-3 border-t border-white/[0.07] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-slate-600">
            <Sparkles size={12} />
            Datos sincronizados con LLAPI
          </p>
          <p className="flex items-center gap-2 text-[10px] text-slate-600">
            <Clock3 size={12} />
            Última actualización: 28 oct 2026, 14:32 UTC
          </p>
        </footer>
      </main>
    </div>
  );
}
