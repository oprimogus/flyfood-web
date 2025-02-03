import { Star } from 'lucide-react'

export function StoreRating({ score }: { score: number }) {
  const formattedScore = (score / 100).toFixed(2)
  
  return (
    <div className="flex flex-row justify-between items-center space-x-1">
      <Star size={18} color="#fcbb00" fill="#fcbb00" />
      <p className="text-[#fcbb00] font-medium">{formattedScore}</p>
    </div>
  )
}

