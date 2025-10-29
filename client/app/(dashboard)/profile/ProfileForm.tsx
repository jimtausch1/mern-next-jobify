'use client';

import styles from '@/assets/css/DashboardForm.module.css';
import FormRow from '@/components/FormRow';
import SubmitBtn from '@/components/SubmitBtn';
import { useDashboardContext } from '@/context/DashboardContext';
import { customFetch } from '@/utils';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function ProfileForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { user } = useDashboardContext();
  const { name, lastName, email, location } = user;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserModel>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<UserModel> = async (data) => {
    alert(JSON.stringify(data));

    try {
      await customFetch.patch('/users/update-user', data);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('Profile updated successfully');
      return router.push('all-jobs');
    } catch (error: any) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };

  return (
    <section className={styles.section}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form} encType="multipart/form-data">
        <h4 className={styles['form-title']}>profile</h4>
        <div className={styles['form-center']}>
          {/* <div className={styles['form-row']}>
            <label htmlFor="avatar" className={styles['form-label']}>
              Select an image file (max 0.5 MB)
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              className={styles['form-input']}
              accept="image/*"
            />
          </div> */}
          <FormRow
            type="text"
            name="name"
            error={errors.name}
            {...register('name', {
              required: { value: true, message: 'Field is required' },
              minLength: { value: 3, message: 'Must be at least 3 characters' },
            })}
            defaultValue={name}
          />
          <FormRow
            type="text"
            name="lastName"
            labelText="last name"
            error={errors.lastName}
            {...register('lastName', {
              required: { value: true, message: 'Field is required' },
              minLength: { value: 3, message: 'Must be at least 3 characters' },
            })}
            defaultValue={lastName}
          />
          <FormRow
            type="email"
            name="email"
            error={errors.email}
            {...register('email', {
              required: { value: true, message: 'Field is required' },
              minLength: { value: 3, message: 'Must be at least 3 characters' },
            })}
            defaultValue={email}
          />
          <FormRow
            type="text"
            name="location"
            error={errors.location}
            {...register('location', {
              required: { value: true, message: 'Field is required' },
              minLength: { value: 3, message: 'Must be at least 3 characters' },
            })}
            defaultValue={location}
          />
          <SubmitBtn formBtn />
        </div>
      </form>
    </section>
  );
}
