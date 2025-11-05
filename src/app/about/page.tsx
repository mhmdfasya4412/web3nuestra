import { genPageMetadata } from '../seo'

import Image from '@/components/Image'
import { coreContent } from '@/lib/utils'
import { Authors, allAuthors } from 'contentlayer/generated'
import { GoPersonFill } from 'react-icons/go'

const author = allAuthors.find((p) => p.slug === 'default') as Authors
const mainContent = coreContent(author)
export const metadata = genPageMetadata({ title: 'About' })
export default function Home() {
  const { name, avatar, occupation, company, email, twitter, linkedin, github } = mainContent
  return (
    <>
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-4xl font-bold  tracking-tight text-gray-900 dark:text-gray-100">
          About <GoPersonFill className="inline-block" />
        </h1>
      </div>
      <div className="items-start">
        <div className="mb-2">
          <Image
            src={'/images/MFasya.jpg'}
            alt={'count'}
            width={200}
            height={200}
            unoptimized
            className="mx-auto rounded-full"
          />
        </div>
        <div className="sticky mt-4 text-center">
          <h2 className="text-2xl font-semibold">Muhammad "Nuestra" Fasya</h2>
        </div>
        <div className={`prose font-sans dark:prose-dark xl:col-span-2`}>
          {/* Converted MDX -> static HTML because Vercel does not support MDX at runtime */}
          <div
            dangerouslySetInnerHTML={{
              __html: `
<p>I am a website developer, bot developer, graphic designer, and a bit of reverse engineer. I learned to make a website from 2020. I learned to use javascript in 2020, i'm also learn how to use Adobe software like Photoshop, After Effect at 2021. I'm currently learning <span style="background-color:#0ea4e9;color:inherit;padding:0 .15rem;border-radius:.25rem;">Cloud Computing.</span></p>

<h2>🏆 Achievements</h2>
<ul>
  <li><span style="background-color:#FF0000;color:#fff;padding:0 .15rem;border-radius:.25rem;">Tahfidz Qur'an</span> Juz 30</li>
  <li>Third place in the <span style="background-color:#0a2585;color:#fff;padding:0 .15rem;border-radius:.25rem;">VALORANT</span> Tournament at GS Gaming Arena</li>
</ul>

<h2>🔬 Education</h2>
<ul>
  <li>Universitas Muhammadiyah Bengkulu</li>
  <li>SMKN 1 Kota Bengkulu</li>
  <li>SMPN 4 Kota Bengkulu</li>
  <li>MTs Ja-alHaq (School Transfer)</li>
</ul>

<h2>🛠️ Skills</h2>
<ul>
  <li>Programming (HTML, CSS, Javascript, PHP, Python)</li>
  <li>Graphic design (Photoshop, Figma, Alight Motion)</li>
  <li>Movie Editing (After Effect, Premiere Pro, CapCut)</li>
  <li>Competitive VALORANT (peak rank: Ascendant 3)</li>
</ul>

<h2>❤️ Others</h2>
<p>See all my projects on <a href="/projects">Projects Page</a></p>

<h2>⌛ Time Line</h2>
<h3>2024</h3>
<ul>
  <li>I Learn Cloud Computing</li>
  <li>I Learn <a href="https://aws.amazon.com/">AWS</a> for the <span style="background-color:#FF0000;color:#fff;padding:0 .15rem;border-radius:.25rem;">first time.</span></li>
</ul>

<h3>2022</h3>
<ul>
  <li>I learn NEXTJS (Now)</li>
  <li>I created Nuevy (Bot Discord) DISCONTINUED</li>
</ul>

<h3>2021</h3>
<ul>
  <li>I experimented with reverse-engineering online games such as <a href="https://roblox.com/">ROBLOX</a>.</li>
  <li>My first WhatsApp bot (I forked <a href="https://github.com/Nurutomo/wabot-aq">Nurutomo</a>'s Repository.)</li>
</ul>

<h3>2020</h3>
<ul>
  <li>I'm learning javascript for the first time.</li>
  <li>COVID-19.</li>
  <li>I create my first website using html and css.</li>
  <li>I learned my first HTML.</li>
</ul>

<h3>2019</h3>
<ul>
  <li>I join discord.</li>
</ul>

<h3>2018</h3>
<ul>
  <li>Graduate Tahfidz Quran.</li>
</ul>

<h3>2007</h3>
<ul>
  <li>👶 Born and raised in Bengkulu, Indonesia 🇮🇩.</li>
</ul>
              `,
            }}
          />
        </div>
      </div>
    </>
  )
}
