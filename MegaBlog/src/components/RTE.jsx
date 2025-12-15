import React from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

export default function RTE({ name, control, label, defaultValue = '' }) {
    // TinyMCE API Key - Get your free key from https://www.tiny.cloud/auth/signup/
    // Add it to your .env file as: VITE_TINYMCE_API_KEY=your-api-key-here
    const TINYMCE_API_KEY = import.meta.env.VITE_TINYMCE_API_KEY || 'no-api-key';

    return (
        <div className='w-full'>
            {label && (
                <label className='inline-block mb-3 pl-1 text-sm font-semibold text-slate-800 tracking-wide' htmlFor={name}>
                    {label}
                </label>
            )}

            <div className='mt-2 rounded-2xl border border-slate-200 bg-slate-50/70 shadow-sm p-4 sm:p-5 space-y-4'>
            <Controller
                name={name || 'content'}
                control={control}
                defaultValue={defaultValue}
                render={({ field: { onChange, value } }) => (
                    <Editor
                        apiKey={TINYMCE_API_KEY}
                        value={value || defaultValue}
                        init={{
                            height: 500,
                            menubar: true,
                            plugins: [
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "code",
                                "help",
                                "wordcount",
                            ],
                            toolbar:
                                "undo redo | blocks | " +
                                "bold italic forecolor | alignleft aligncenter " +
                                "alignright alignjustify | bullist numlist outdent indent | " +
                                "removeformat | help",
                            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                            // Ensure editor is editable
                            readonly: false,
                        }}
                        onEditorChange={onChange}
                    />
                )}
            />
            </div>
        </div>
    )
}
