import { Controller, Post, Body, Get, Param, Put, Delete, Query } from "@nestjs/common";
import { SendgridService } from "src/sendgrid/sendgrid.service";
import { CommitmentsService } from './commitments.service';
import { CreateCommitmentDto } from "./dto/create-commitment.dto";
import { UpdateCommitmentDto } from "./dto/update-commitment.dto";

@Controller('commitments')
export class CommitmentsController {
    constructor(
        private commitmentsService: CommitmentsService,
        private readonly sendgridService: SendgridService,
    ) { }

    @Post()
    async createCommitment(
        @Body() createCommitmentDto: CreateCommitmentDto,
    ) {
        const commitment = await this.commitmentsService.createCommitment(createCommitmentDto);

        const mail = {
            to: 'michaelfarias@alu.ufc.br',
            from: 'michaelfarias@alu.ufc.br',
            subject: 'Hello from sendgrid',
            text: 'Hello',
            html: '<h1>Hello</h1>'
        };

        // await this.sendgridService.send(mail)

        return commitment;
    }
    @Get()
    async findCommitment(
        @Query("id") idUser, @Query('from') from, @Query("to") to
    ) {
        console.log(idUser)
       return  this.commitmentsService.findCommitment(idUser, from, to);
    }

    @Get(':id')
    async findCommitmentById(@Param('id') id) {
        return this.commitmentsService.findCommitmentById(id);
    }

    @Put(':id')
    async updateCommitment(
        @Param('id') id,
        @Body() updateCommitmentDto: UpdateCommitmentDto
    ) {
        return this.commitmentsService.updateCommitment(updateCommitmentDto, id);
    }

    @Delete(':id')
    async deleteCommitment(@Param('id') id) {
        await this.commitmentsService.deleteCommitment(id);

        return {
            message: "Compromisso deletado com sucesso."
        }
    }
}