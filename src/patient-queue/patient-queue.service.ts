import { Injectable } from '@nestjs/common';
import { CreatePatientQueueDto } from './dto/create-patient-queue.dto';
import { UpdatePatientQueueDto } from './dto/update-patient-queue.dto';

@Injectable()
export class PatientQueueService {
  create(createPatientQueueDto: CreatePatientQueueDto) {
    return 'This action adds a new patientQueue';
  }

  findAll() {
    return `This action returns all patientQueue`;
  }

  findOne(id: number) {
    return `This action returns a #${id} patientQueue`;
  }

  update(id: number, updatePatientQueueDto: UpdatePatientQueueDto) {
    return `This action updates a #${id} patientQueue`;
  }

  remove(id: number) {
    return `This action removes a #${id} patientQueue`;
  }
}
