import { Component, inject } from '@angular/core';
import { AuthStore } from '../../../../../../core/auth/auth.store';
import { LucideAngularModule, Phone, User, FileText, SquarePen, Lock, Camera, Calendar } from 'lucide-angular';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { FileUpload } from '@common/components';
import { IUser } from '@common/models';
import { ApiImgPipe } from '@common/pipes';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-user-profil',
  imports: [LucideAngularModule, ApiImgPipe, CommonModule, NgOptimizedImage, FileUpload],
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
    edit: SquarePen,
    camera: Camera,
    calendar: Calendar
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
