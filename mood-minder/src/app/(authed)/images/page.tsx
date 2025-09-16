const IMAGES = [
  { src: 'https://picsum.photos/seed/fun1/600/400', alt: 'Funny placeholder 1' },
  { src: 'https://picsum.photos/seed/fun2/600/400', alt: 'Funny placeholder 2' },
  { src: 'https://picsum.photos/seed/fun3/600/400', alt: 'Funny placeholder 3' },
  { src: 'https://picsum.photos/seed/fun4/600/400', alt: 'Funny placeholder 4' },
]

import { ActivityTracker } from '@/components/ActivityTracker'

export default function ImagesPage() {
  return (
    <div className="space-y-6">
      <ActivityTracker feature="images" />
      <h2 className="text-2xl font-semibold">Funny Images</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {IMAGES.map((img, idx) => (
          <div key={idx} className="card overflow-hidden">
            <img src={img.src} alt={img.alt} className="h-auto w-full" />
          </div>
        ))}
      </div>
    </div>
  )
}

