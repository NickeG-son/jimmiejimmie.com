'use client'

import { NextStudio } from 'next-sanity/studio'
// Make sure this path correctly points to where your sanity.config.ts file is!
import config from '../../../sanity/sanity.config'

export default function StudioPage() {
    return <NextStudio config={config} />
}
