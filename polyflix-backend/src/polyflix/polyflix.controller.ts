import { Controller, Get, Res, HttpStatus, Param, NotFoundException, Post, Body, Put, Query, Delete } from '@nestjs/common';
import { PolyflixService } from './polyflix.service';
import { CreatePolyflixDTO } from './dto/create-polyflix-d-t.o';
import { ValidateObjectId } from './shared/pipes/validate-object-id.pipes';

@Controller('polyflix')
export class PolyflixController {

  constructor(private blogService: PolyflixService) { }

  // Fetch all movies
  @Get('movies')
  async getMovies(@Res() res) {
    const movies = await this.blogService.getMovies();
    return res.status(HttpStatus.OK).json(movies);
  }
  // Fetch a particular movie using ID
  @Get('movie/:movieID')
  async getMovie(@Res() res, @Param('movieID', new ValidateObjectId()) postID) {
    const movie = await this.blogService.getMovie(postID);
    if (!movie) {
        throw new NotFoundException('Movie does not exist!');
    }
    return res.status(HttpStatus.OK).json(movie);
  }
  // Submit a movie
  @Post('/movie')
  async addMovie(@Res() res, @Body() createMovieDTO: CreatePolyflixDTO) {
    const newMovie = await this.blogService.addMovie(createMovieDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Movie has been submitted successfully!',
      movie: newMovie,
    });
  }
  @Put('/edit')
  async editMovie(
    @Res() res,
    @Query('movieID', new ValidateObjectId()) movieID,
    @Body() createMovieDTO: CreatePolyflixDTO,
  ) {
    const editedMovie = await this.blogService.editMovie(movieID, createMovieDTO);
    if (!editedMovie) {
        throw new NotFoundException('Movie does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Movie has been successfully updated',
      movie: editedMovie,
    });
  }
  // Delete a movie using ID
  @Delete('/delete')
  async deleteMovie(@Res() res, @Query('movieID', new ValidateObjectId()) movieID) {
    const deletedMovie = await this.blogService.deleteMovie(movieID);
    if (!deletedMovie) {
        throw new NotFoundException('Movie does not exist!');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Movie has been deleted!',
      movie: deletedMovie,
    });
  }
}
