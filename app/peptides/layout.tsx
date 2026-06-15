import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Peptide Research Library',
  description:
    'Comprehensive reference guide to 35+ research peptides. Mechanisms, applications, and research notes for BPC-157, TB-500, CJC-1295, Ipamorelin, and more.',
}

export default function PeptidesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
