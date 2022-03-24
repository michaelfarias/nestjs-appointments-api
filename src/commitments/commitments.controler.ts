import { Controller, Post, Body, Get, Param, Put, Delete, Query, UseGuards } from "@nestjs/common";
import { SendgridService } from "src/sendgrid/sendgrid.service";
import { CommitmentsService } from './commitments.service';
import { CreateCommitmentDto } from "./dto/create-commitment.dto";
import { UpdateCommitmentDto } from "./dto/update-commitment.dto";
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/role.decorator';
import { UserRole } from '../users/user-roles.enum';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('commitments')
@UseGuards(AuthGuard(), RolesGuard)
export class CommitmentsController {
    constructor(
        private commitmentsService: CommitmentsService,
        private readonly sendgridService: SendgridService,
    ) { }

    @Post()
    @Roles([UserRole.USER])
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

        await this.sendgridService.send(mail)

        return commitment;
    }

    @Get()
    @Roles([UserRole.USER])
    async findCommitment(
        @Query("id") idUser, @Query('from') from, @Query("to") to, @Query("time_to") time_to, @Query("time_from") time_from
    ) {
        return this.commitmentsService.findCommitment(idUser, from, time_from, to, time_to);
    }

    @Get(':id')
    @Roles([UserRole.USER])
    async findCommitmentById(@Param('id') id) {
        return this.commitmentsService.findCommitmentById(id);
    }

    @Put(':id')
    @Roles([UserRole.USER])
    async updateCommitment(
        @Param('id') id,
        @Body() updateCommitmentDto: UpdateCommitmentDto
    ) {
        return this.commitmentsService.updateCommitment(updateCommitmentDto, id);
    }

    @Delete(':id')
    @Roles([UserRole.USER])
    async deleteCommitment(@Param('id') id) {
        await this.commitmentsService.deleteCommitment(id);

        return {
            message: "Compromisso deletado com sucesso."
        }
    }
}