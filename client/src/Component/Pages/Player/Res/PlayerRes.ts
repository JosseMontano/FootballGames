import { TeamResType } from "../../../../Shared/Interfaces/Team"
import { PlayerFormDTO } from "../Dtos/PlayerForm"

export interface PlayerResType extends PlayerFormDTO{
    id: number
    champeonships: any[]
    team: TeamResType
  }
  