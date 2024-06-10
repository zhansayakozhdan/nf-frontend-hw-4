"use client"
import React, { ChangeEvent, use, useState } from 'react'
import { createProduct } from '../api/services/products';
import { title } from 'process';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { imagesApiAxiosInstance } from '../api/apiClient';

const IMAGES_API_URL = 'https://api.escuelajs.co/api/v1';

const CreateProductPage = () => {
    const [formData, setFormData] = useState({title: '', description: '', price: 0, category: '', image: ''});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const client = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            client.invalidateQueries({ queryKey: ['products'] }); //гарантирует что при добавлении продукта он не просто добавится 
                                                                //в базу но в том числе произойдет обновление у меня в приложении
        }
    })


    const [uploading, setUploading] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedFile, setSelectedFile] = useState<File>();
    const [message, setMessage] = useState('');

    const handleUpload = async() => {
        setUploading(true);
        try {
            if(!selectedFile) return;

            const imageFile = new FormData();
            imageFile.append("file", selectedFile);
            const { data } = await axios.post(`${IMAGES_API_URL}/files/upload`, imageFile);
            console.log(data);

            setFormData({ ...formData, image: data.location });
        } catch(error) {
            console.log(error);
        }
        setUploading(false);
    }


    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));

        //console.log(formData);
    };

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();

        if(!formData.image){
            setError("Пожалуйста сначала загрузите фото!");
            return;
        }
        if(!formData.title || !formData.description ){
            setError("Пожалуйста заполните все поля");
            return;
        } 

        setError(null);
        setIsLoading(true);

        try {
            mutate({
                title: formData.title,
                description: formData.description,
                image: formData.image,
                price: formData.price,
                category: formData.category
            });
            console.log('Product created successfully');
            router.push('/');
        } catch(error) {
            console.log(error);
            setError("Что то пошло не так. Попробуйте заново")
        }
        
    };



  return (
    <div className='max-w-4xl mx-auto p-20 space-y-6'>
      <h2 className='text-2xl font-bold my-8 text-center'>Add New Product</h2>

    
      <label>
        <input 
        type='file' 
        hidden
        onChange={({ target }) => {
            if(target.files) {
                const file = target.files[0];
                setSelectedImage(URL.createObjectURL(file));
                setSelectedFile(file);
            }
        }}/>
        {/* container */}
        <div className='w-96 aspect-video rounded flex items-center justify-center border-2 border-dashed cursor-pointer border-black'>
            {selectedImage 
            ? (
                <img src={selectedImage} alt=''/>
            ) : (
                <span>Select Image</span>
            )}
        </div>
      </label>
      <button
      onClick={handleUpload}
      disabled={uploading}
      style={{ opacity: uploading ? ".5" : "1" }}
      className='bg-red-600 p-3 w-32 text-center rounded text-white '
      >
        {uploading ? "Загружается..." : "Загрузить"}
      </button>
      
    
      
     
      <form onSubmit={handleSubmit} className='flex gap-3 flex-col'>
        <input
        type='text'
        name='title'
        placeholder='Title'
        value={formData.title}
        className='py-1 px-1 border rounded-md'
        onChange={handleInputChange}
        />
        <textarea
        rows={4}
        name='description'
        placeholder='Description'
        value={formData.description}
        className='py-1 px-4 border rounded-md resize-none'
        onChange={handleInputChange}
        ></textarea>
        <input
        type='number'
        name='price'
        placeholder='Price'
        value={formData.price}
        className='py-1 px-1 border rounded-md'
        onChange={handleInputChange}
        />
        <input
        type='text'
        name='category'
        placeholder='Category'
        value={formData.category}
        className='py-1 px-1 border rounded-md'
        onChange={handleInputChange}
        />

        <button className='bg-black text-white mt-5 px-4 py-1 rounded-md cursor-pointer' type='submit' disabled={isLoading}>
            {isLoading ? "Идет добавление..." : "Добавить продукт"}
        </button>
      </form>

      {error && <p className='text-red-500 mt-4'>{error}</p>}
    </div>
  )
}

export default CreateProductPage
