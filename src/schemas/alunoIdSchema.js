const z = require("zod");

const alunoIdSchema = z.object({
    id: z.string().regex(/^\d+$/, "ID deve ser numérico")
});

module.exports = alunoIdSchema;