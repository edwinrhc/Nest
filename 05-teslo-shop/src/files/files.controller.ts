import { Controller, Get, Post, Body, Patch, Param, Delete,UploadedFile,UseInterceptors, BadRequestException } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/fileFilter.helper';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('product')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter

  }))
  uploadFile(
      @UploadedFile() file: Express.Multer.File )
  {
    if(!file){
      throw new BadRequestException('Make sure that file is an image');
    }

    return {
      fileName: file.originalname
    };

  }


}
