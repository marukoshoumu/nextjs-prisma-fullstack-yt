"use client";

import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import useLoginModal from "@/app/hocks/useLoginModal";
import useSignupModal from "@/app/hocks/useSignupModal";
import Modal from "@/app/components/modals/Modal";
import Input from "@/app/components/input/Input";
import Button from "@/app/components/button/Button";
import axios from "axios";
import * as z from "zod";

const schema = z.object({
  email: z.string().email({ message: "メールアドレスの形式ではありません。" }),
  password: z.string().min(6, { message: "6文字以上入力する必要があります。" }),
});

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const signupModal = useSignupModal();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(schema),
  });
  const onToggle = useCallback(() => {
    signupModal.onClose();
    loginModal.onOpen();
  }, [signupModal, loginModal]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      if (res?.error) {
        toast.error("エラーが発生しました。" + res.error);
        return;
      }
      toast.success("ログインしました!");
      loginModal.onClose();
      router.refresh();
    } catch (error) {
      toast.error("エラーが発生しました。" + error);
    } finally {
      setLoading(false);
    }
  };
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        id="email"
        label="メールアドレス"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="パスワード"
        type="password"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="mt-3 flex flex-col gap-4">
      <hr />
      <Button
        outline
        label="Googleでログイン"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />

      <div className="mt-4 text-center">
        <div
          onClick={onToggle}
          className="cursor-pointer text-sm text-neutral-500 hover:underline"
        >
          アカウントを作成する
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      disalbled={loading}
      isOpen={loginModal.isOpen}
      title="ログイン"
      primaryLabel="ログイン"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
