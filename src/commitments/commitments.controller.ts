import { Controller, Post, Body, Get, Param, Put, Delete, Query, UseGuards } from "@nestjs/common";
import { SendgridService } from "src/sendgrid/sendgrid.service";
import { CommitmentsService } from './commitments.service';
import { CreateCommitmentDto } from "./dto/create-commitment.dto";
import { UpdateCommitmentDto } from "./dto/update-commitment.dto";
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/role.decorator';
import { UserRole } from '../users/user-roles.enum';
import { RolesGuard } from 'src/auth/roles.guard';
import { GetUser } from "src/auth/get-user.decorator";
import { User } from '../users/user.entity';

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
        const { email_people_involved, description, date_time, place, user } = commitment
        email_people_involved.push(user.email)

        const mail = {
            to: email_people_involved,
            from: 'noreply@application.com',
            subject: `Appointment Scheduled`,
            text: 'Appointment Invitation',
            html: '<body>' +
                `<h3>Appointment Date: ${date_time}</h3></br>` +
                `<h3>Appointment Description: ${description}</h3></br>` +
                `<h3>Place: ${place}</h3></br>` +
                `<h3>People Involved: ${email_people_involved}</h3></br>` +
                '</body>'
        };

        // await this.sendgridService.send(mail)

        return commitment;
    }

    @Get()
    @Roles([UserRole.USER])
    async findCommitment(
        @GetUser() user: User, @Query('from') from, @Query("to") to, @Query("time_to") time_to, @Query("time_from") time_from
    ) {
        return this.commitmentsService.findCommitment(user.id, from, time_from, to, time_to);
    }

    @Get('publics')
    @Roles([UserRole.USER])
    async findCommitments() {
        return this.commitmentsService.findPublicAppointments();
    }

    @Put(':id')
    @Roles([UserRole.USER])
    async updateCommitment(
        @GetUser() user: User,
        @Param('id') id,
        @Body() updateCommitmentDto: UpdateCommitmentDto
    ) {
        return this.commitmentsService.updateCommitment(user.id, updateCommitmentDto, id);
    }

    @Delete(':id')
    @Roles([UserRole.USER])
    async deleteCommitment(@GetUser() user: User, @Param('id') id) {

        await this.commitmentsService.deleteCommitment(user.id, id);

        return {
            message: "Compromisso deletado com sucesso."
        }
    }
}