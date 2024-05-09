import { useAppDispatch } from "src/shared/lib/hooks"
import { changeModalEditionAvatar } from "src/shared/ui/modal"
import { dogAPIUrl, useGetWoofQuery } from "../api/dog.api"

interface IAvatarSelectorProps {
  onSelect: (avatarUrl: string) => void
}

export const Dogs = (props: IAvatarSelectorProps) => {
  const { onSelect } = props
  const dispatch = useAppDispatch();
  const { data: images, isLoading: isLoadingImages, isError: isErrorImages } = useGetWoofQuery()

  const changeAvatarHandler = (src: string) => {
    onSelect(src)
    dispatch(changeModalEditionAvatar(false))
  }

  if (isErrorImages) {
    return <div>Error loading images!</div>
  }

  if (isLoadingImages) {
    return <div>Loading images...</div>
  }

  if (!images?.length) {
    return <div>No dogs :-(</div>
  }

  const imagesWithCurrExpansion = images.filter((image: string) => {
    const lowerCaseExpansion = image.toLowerCase()
    const hasCurrentExpansion = lowerCaseExpansion.includes('.jpg') || lowerCaseExpansion.includes('.png') || lowerCaseExpansion.includes('.webp')
    return hasCurrentExpansion
  })

  return (
    <ul className="flex flex-wrap space-x-4 space-y-4 justify-between aling-center">
      {imagesWithCurrExpansion.slice(0, 10).map((src: string) =>
        <li key={src} className="w-20">
          <img className="cursor-pointer" src={`${dogAPIUrl}/${src}`} alt={`src-image-${src}`} onClick={() => changeAvatarHandler(src)} />
        </li>
      )}
    </ul>
  )
}