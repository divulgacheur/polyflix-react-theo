import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Movie } from './interfaces/polyflix.interface';
import { CreatePolyflixDTO} from './dto/create-polyflix-d-t.o';

@Injectable()
export class PolyflixService {
  constructor(@InjectModel('Movie') private readonly movieModel: Model<Movie>) { }
  async getMovies(): Promise<Movie[]> {
    const movies = await this.movieModel.find().exec();
    return movies;
  }
  async getMovie(movieID): Promise<Movie> {
    const movie = await this.movieModel
      .findById(movieID)
      .exec();
    return movie;
  }
  async addMovie(createMovieDTO: CreatePolyflixDTO): Promise<Movie> {
    const newMovie = await new this.movieModel(createMovieDTO);
    return newMovie.save();
  }
  async editMovie(movieID, createMovieDTO: CreatePolyflixDTO): Promise<Movie> {
    const editedMovie = await this.movieModel
      .findByIdAndUpdate(movieID, createMovieDTO, { new: true });
    return editedMovie;
  }
  async deleteMovie(movieID): Promise<any> {
    const deletedMovie = await this.movieModel
      .findByIdAndRemove(movieID);
    return deletedMovie;
  }
} 