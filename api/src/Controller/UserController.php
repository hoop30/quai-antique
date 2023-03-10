<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\JsonSerializableNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

class UserController extends AbstractController
{
    #[Route('/user', name: 'user_get', methods: ["GET"])]
    public function userGet(UserRepository $userRepository, Request $request)
    {
        $email = $request->query->get('email');
        $password = $request->query->get('pdw');
        $id = $request->query->get('id');

        
        if ($id) {
            $response = $userRepository->findOneBy([
                'id' => $id
            ]);
            
        } else {
            $userToConect = $userRepository->findOneBy([
                'email' => $email
            ]);

            if ($userToConect == []) {
                $response = 'Utilisateur non trouver';
            } else if ($userToConect != []) {
                if ($userToConect->getPassword() === $password) {
                    $response = $userToConect;
                } else {
                    $response = 'le mot de passe est incorrect';
                }
            }
        }
        
        
        return $this->json($response, 200, [], ['groups' => 'user'] );
    }

    #[Route('/user', name: 'user_new', methods: ["POST"])]
    public function userPost(Request $request, SerializerInterface $serializer, EntityManagerInterface $em)
    {
        // add the data
        $data = $request->getContent();
        // create a new user with the data
        $newUser = $serializer->deserialize($data, User::class, 'json');
        // send new user to the DB
        $em->persist($newUser);
        $em->flush();
        // return the new user
        return $this->json($newUser, 201, []);
    }

    #[Route('/user', name: 'user_update', methods: ["PUT"])]
    public function userPut(Request $request, SerializerInterface $serializer, UserRepository $userRepository, EntityManagerInterface $em)
    {
        // add the new data
        $data = $request->getContent();
        $updateUser = $serializer->deserialize($data, User::class, 'json');
        // find user to update
        $email = json_decode($data)->currentmail;
        $user = $userRepository->findOneby([
            'email' => $email,
        ]);

        //dd($updateUser->getEmail() , $email);
        // test if mail is unique
        if ($updateUser->getEmail() !== $email) {

            $test = $userRepository->findOneby([
                'email' => $updateUser->getEmail(),
            ]);
            if ($test) {
                return $this->json('ce mail existe deja', 201, []);
            }
        }
        
        // update
        $user
        ->setName($updateUser->getName())
        ->setEmail($updateUser->getEmail())
        ->setPhone($updateUser->getPhone())
        ->setInfo($updateUser->getInfo());
        
        // update send in DB
        $em->persist($user);
        $em->flush();

        // reurn the update user
        return $this->json($user, 201, []);
    }
}
