import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { envDataConf } from "../../server/server";

export const load: PageServerLoad = async ({ fetch }) => {
  const jwt = "jwt=dear";

  const token = jwt.split("=")[1];
  try {
    const validateSesion = await fetch(
      `${envDataConf.URLBACK}/auth/user`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!validateSesion.ok){
      throw new Error("Error al acceder a la página");
    }
  } catch (err) {
    return redirect(303, "/auth/login");
  }
};
