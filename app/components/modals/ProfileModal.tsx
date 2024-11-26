"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import useLoginModal from "@/app/hocks/useLoginModal";
import useSignupModal from "@/app/hocks/useSignupModal";
import Modal from "@/app/components/modals/Modal";
import Input from "@/app/components/input/Input";
import Button from "@/app/components/button/Button";
import axios from "axios";
import * as z from "zod";
import { User } from "@prisma/client";
import useProfileModal from "@/app/hocks/useProfileModal";

const schema = z.object({
  name: z.string().min(2, { message: "2文字以上入力する必要があります。" }),
});

type ProfileModalProps = {
  currentUser: User | null;
};

const ProfileModal: React.FC<ProfileModalProps> = ({ currentUser }) => {
  const router = useRouter();
  const profileModal = useProfileModal();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    resolver: zodResolver(schema),
  });
  useEffect(() => {
    if (currentUser) {
      reset({ name: currentUser.name });
    }
  }, [currentUser]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    try {
      const res = await axios.patch("/api/profile", data);
      if (res.status === 200) {
        toast.success("アカウントを変更しました!");
        profileModal.onClose();
        router.refresh();
      }
    } catch (error) {
      toast.error("エラーが発生しました。" + error);
    } finally {
      setLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        id="name"
        label="名前"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  return (
    <Modal
      disalbled={loading}
      isOpen={profileModal.isOpen}
      title="プロフィール"
      primaryLabel="プロフィール"
      onClose={profileModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    />
  );
};

export default ProfileModal;
