"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import ImagesForm from "@/views/Images/images-Form";
import { buttonDataType } from "@/types/buttonDataType";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { UploadCloud } from "lucide-react";

interface AddElementButtonProps {
  buttonName: string;
  dataType: buttonDataType;
}

const AddElementButton = ({ buttonName, dataType }: AddElementButtonProps) => {
  const [openForm, setOpenForm] = useState(false);

  const renderForm = () => {
    if (!openForm) return null;

    switch (dataType) {
      case buttonDataType.IMAGE:
         return <ImagesForm onClose={() => setOpenForm(false)} />;

      default:
        break;
    }
  };

  return (
    <>
      <Dialog open={openForm} onOpenChange={setOpenForm}>
        <div className=" flex justify-end pb-3">
          <DialogTrigger asChild>
            <Button
              onClick={() => setOpenForm(!openForm)}
              className="bg-amber-300 rounded-lg  hover:cursor-pointer text-black"
            >
              {" "}
              <UploadCloud /> {/* w-6 = 24px */}
              {buttonName}{" "}
            </Button>
          </DialogTrigger>
        </div>

        {renderForm()}
      </Dialog>
    </>
  );
};

export default AddElementButton;
