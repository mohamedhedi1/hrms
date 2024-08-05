export class RoleResponseDto
{
    id: string;
    name: string;
    privileges: {
      id: string;
      name: string;
    }[];
}