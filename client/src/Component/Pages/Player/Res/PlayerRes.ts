import { TeamResType } from "../../../../Shared/Interfaces/Team"
import {  PlayerType } from "../Dtos/PlayerForm"

export interface PlayerResType extends PlayerType{
    id: number
    champeonships: any[]
    team: TeamResType
  }
  