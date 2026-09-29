const prisma = require("../databases/prisma");
const AlunoInvalidoError = require("../errors/AlunoInvalidoError");
const AlunoNaoEncontradoError = require("../errors/AlunoNaoEncontradoError");
const ApiError = require("../errors/ApiError");

class AlunoService{

async findUnique(id){
    const aluno = await prisma.aluno.findUnique({
        where: {
            id: Number(id)
        }
    });

    if(!aluno){
        throw new AlunoNaoEncontradoError();
    }

    return aluno;
}

async findMany(page, pageSize, orderBy, order){
    const alunos = await prisma.aluno.findMany({
        skip: (page - 1) * pageSize,
        take: Number(pageSize),
        orderBy: {
            [orderBy]: order
        }
    });

    const total = await prisma.aluno.count();

    return { alunos, total };
}
async update(id, dados){
    const alunoExistente = await this.findUnique(id);

    const {nome, email} = dados || {};

    if(!nome || !email){
        throw new AlunoInvalidoError();
    }

    try{
        const alunoAtualizado = await prisma.aluno.update({
            where: {
                id: Number(id)
            },
            data: {
                nome,
                email
            }
        });

        return alunoAtualizado;
    }catch(e){
        if(e.code === "P2002"){
            throw new ApiError("E-mail já cadastrado", 409);
        }

        throw e;
    }
}
    async create(aluno){
        const {nome, email} = aluno;
        if(!nome || !email){
            throw new AlunoInvalidoError();
        }
        //create = insert
        //update = update
        //delete = delete
        //findMany = select * from
        const novoAluno = await prisma.aluno.create({data:aluno});

        return novoAluno;
    }
}

module.exports = new AlunoService();