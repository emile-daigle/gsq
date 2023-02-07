import IGarage from "../../interfaces/IGarage";
import { supabase } from "./supabase";

export const getGarages = async () => {
  try {
    const { data, error, status } = await supabase.from("garages").select("id, image, name, link, image, phone, address, marker, pos")
    if (error && status !== 406) {
      throw error;
    }
    if (data) {
      return data as IGarage[];
    }
  } catch (error) {
    console.log(error);
    throw error
  }
};
