import { Dimensions, PixelRatio, Platform } from "react-native";

export const PX=(value)=>{
    let ratio = PixelRatio.get()
    return PixelRatio.getPixelSizeForLayoutSize(value/ratio)
    }