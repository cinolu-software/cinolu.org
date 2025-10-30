import { Component, inject } from '@angular/core';
import { AuthStore } from '../../../../../../core/auth/auth.store';
import {
  LucideAngularModule,
  Phone,
  User,
  FileText,
  Edit,
  Lock,
  Camera,
  Calendar,
  MapPin,
  Mail,
  MoveRight
} from 'lucide-angular';
import { ApiImgPipe } from '../../../../../../shared/pipes/api-img.pipe';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FileUpload } from '../../../../../../shared/components/file-upload/file-upload';
import { environment } from '../../../../../../../environments/environment';
import { IUser } from '../../../../../../shared/models/entities.models';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-user-profil',
  imports: [LucideAngularModule, ApiImgPipe, CommonModule, NgOptimizedImage, Button, FileUpload, RouterLink],
  templateUrl: './user-profil.html'
})
export class UserProfil {
  url = environment.apiUrl + 'users/image-profile';

  store = inject(AuthStore);

  icons = {
    user: User,
    phone: Phone,
    fileText: FileText,
    lock: Lock,
    edit: Edit,
    camera: Camera,
    calendar: Calendar,
    mapPin: MapPin,
    mail: Mail,
    moveRight: MoveRight
  };

  handleLoaded(): void {
    this.store.getProfile();
  }

  isGender(user: IUser): string {
    switch (user.gender) {
      case 'male':
        return 'Masculin';
      case 'female':
        return 'Féminin';
      default:
        return 'Non spécifié';
    }
  }
}
