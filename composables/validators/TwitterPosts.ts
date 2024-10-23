import vine from "@vinejs/vine";

export const TwitterPostsValidator = vine.compile(
  vine.array(
    vine.object({
      body: vine
        .string()
        .optional()
        .requiredWhen((field) => {
          return field.parent.pictures.length === 0 ? true : false;
        }),
      pictures: vine.array(vine.string()).optional(),
    })
  )
);
