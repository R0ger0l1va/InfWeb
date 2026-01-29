"use client";
import { error } from "console";
import { useForm } from "react-hook-form";
function LearningReact() {
  const { register ,handleSubmit, 
    formState:{errors}} = useForm();
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  console.log(errors);
  
  return (
    <div className="flex items-center min-h-screen border-2 border-amber-300 justify-center">
      <form
        onSubmit={onSubmit}
        className="   flex flex-col   items-baseline      "
      >
        {" "}
        {/*Nombre*/}
        <label htmlFor="nombre">Nombre</label>
        <input
          className="border-2"
          type="text"
          {...register("nombre", { required: true })}
        />
        {
          errors.nombre && <span className="text-red-500 font-medium">Nombre es requerido</span>
        }
        {/*correo*/}
        <label htmlFor="correo">Correo</label>
        <input className="border-2" type="email" {...register("correo")} />
        {/*password*/}
        <label htmlFor="password">Password</label>
        <input className="border-2" type="password" {...register("password")} />
        {/*^Confirm-password*/}
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          className="border-2"
          type="password"
          {...register("confirmPassword")}
        />
        <label htmlFor="fechaDeNacimiento">fecha De Nacimiento</label>
        <input
          className="border-2"
          type="date"
          {...register("fechaDeNacimiento")}
        />
        {/**pais */}
        <label htmlFor="pais">Pais</label>
        <select {...register("pais")}>
          <option value="mx">Mexico</option>
          <option value="co">Colombia</option>
          <option value="ar">Argentina</option>
        </select>
        {/**File */}
        <label htmlFor="foto">foto de Perfil</label>
        <input className="border-2" type="file" {...register("foto")} />
        {/**Terminos */}
        <label htmlFor="terminos">Acepto Terminos y Condiciones</label>
        <input type="checkbox" {...register("terminos")} />
        <button className="border-2">Enviar</button>
      </form>
    </div>
  );
}

export default LearningReact;
